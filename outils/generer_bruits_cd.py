#!/usr/bin/env python3
"""
Génère trois fichiers WAV de bruit (blanc, rose, brun) prêts à graver sur CD audio.

Format : 44 100 Hz, 16 bits, stéréo (norme Red Book / CD audio).
Durée   : 73 minutes (tient sur un CD-R de 74 comme de 80 minutes).
Fondus  : montée de 20 s au début, descente de 60 s à la fin.
Volume  : les trois fichiers sont calés sur le même niveau efficace (RMS),
          pour qu'on n'ait pas à toucher au volume en changeant de disque.

Usage :  python3 generer_bruits_cd.py [dossier_de_sortie]
Besoin :  python3, numpy, scipy   (pip3 install numpy scipy)
"""
import sys, os, wave, time
import numpy as np
from scipy.signal import lfilter, lfilter_zi

SR = 44100          # Hz, norme CD
MINUTES = 73.0      # durée
FADE_IN = 20.0      # s
FADE_OUT = 60.0     # s
RMS_DBFS = -18.0    # niveau efficace visé, identique pour les trois
CHUNK = 10.0        # s, taille des morceaux traités en mémoire

# Filtre « pink » : -3 dB par octave, précis de 10 Hz à 20 kHz
PINK_B = [0.049922035, -0.095993537, 0.050612699, -0.004408786]
PINK_A = [1.0, -2.494956002, 2.017265875, -0.522189400]
# Filtre « brown » : passe-bas à un pôle, coupure 15 Hz -> -6 dB par octave
BROWN_FC = 15.0
_a = float(np.exp(-2 * np.pi * BROWN_FC / SR))
BROWN_B, BROWN_A = [1.0 - _a], [1.0, -_a]


def make_state(kind, channels=2):
    if kind == 'blanc':
        return None
    b, a = (PINK_B, PINK_A) if kind == 'rose' else (BROWN_B, BROWN_A)
    zi = lfilter_zi(b, a)
    return {'b': b, 'a': a, 'zi': [np.zeros_like(zi) for _ in range(channels)]}


def block(kind, state, n, rng, channels=2):
    """Un bloc de n échantillons par canal, en float32, canaux indépendants."""
    out = np.empty((channels, n), dtype=np.float64)
    for c in range(channels):
        w = rng.standard_normal(n)
        if state is None:
            out[c] = w
        else:
            y, state['zi'][c] = lfilter(state['b'], state['a'], w, zi=state['zi'][c])
            out[c] = y
    return out


def measure_gain(kind, seconds=120.0, seed=12345):
    """Niveau efficace mesuré sur un extrait : donne le gain à appliquer."""
    rng = np.random.default_rng(seed)
    st = make_state(kind)
    n = int(SR * seconds)
    # on jette la première seconde, le temps que les filtres se stabilisent
    block(kind, st, SR, rng)
    x = block(kind, st, n, rng)
    rms = float(np.sqrt(np.mean(x ** 2)))
    return (10 ** (RMS_DBFS / 20.0)) / rms


def fade_gain(start, n, total):
    """Enveloppe de fondu (sinus au carré) pour les échantillons [start, start+n)."""
    i = np.arange(start, start + n, dtype=np.float64)
    g = np.ones(n)
    fi, fo = FADE_IN * SR, FADE_OUT * SR
    if start < fi:
        m = i < fi
        g[m] = np.sin(0.5 * np.pi * i[m] / fi) ** 2
    if start + n > total - fo:
        m = i > total - fo
        g[m] = np.minimum(g[m], np.sin(0.5 * np.pi * (total - i[m]) / fo) ** 2)
    return g


def generate(kind, path):
    total = int(round(SR * MINUTES * 60))
    gain = measure_gain(kind)
    rng = np.random.default_rng(abs(hash(kind)) % (2 ** 32))
    st = make_state(kind)
    block(kind, st, SR, rng)          # stabilisation des filtres
    peak, done, t0 = 0.0, 0, time.time()
    with wave.open(path, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        while done < total:
            n = min(int(SR * CHUNK), total - done)
            x = block(kind, st, n, rng) * gain * fade_gain(done, n, total)
            peak = max(peak, float(np.max(np.abs(x))))
            np.clip(x, -1.0, 1.0, out=x)
            inter = np.empty(n * 2, dtype=np.int16)
            inter[0::2] = (x[0] * 32767).astype(np.int16)
            inter[1::2] = (x[1] * 32767).astype(np.int16)
            w.writeframes(inter.tobytes())
            done += n
    mb = os.path.getsize(path) / 1e6
    print(f"  {os.path.basename(path)}  {mb:,.0f} Mo  "
          f"crête {20 * np.log10(peak):.1f} dBFS  ({time.time() - t0:.0f} s)")


if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '.'
    os.makedirs(out, exist_ok=True)
    print(f"Génération de 3 fichiers de {MINUTES:g} minutes dans {os.path.abspath(out)}")
    for kind, name in (('blanc', 'bruit-blanc-73min.wav'),
                       ('rose', 'bruit-rose-73min.wav'),
                       ('brun', 'bruit-brun-73min.wav')):
        generate(kind, os.path.join(out, name))
    print("Terminé.")
