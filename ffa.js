// Elemen
const normalEl = document.getElementById("normality");
const weightEl = document.getElementById("weight");
const volumeEl = document.getElementById("volume");
const ffaEl = document.getElementById("ffa");
const resetBtn = document.getElementById("reset");
const werr = document.getElementById("werr");
const verr = document.getElementById("verr");

// Helper: membersihkan input (hanya angka dan satu titik), konversi koma -> titik
function sanitizeRaw(s) {
  if (!s) return "";
  s = s.replace(",", ".");
  let out = "",
    sawDot = false;
  for (let ch of s) {
    if (ch === "." && !sawDot) {
      out += ".";
      sawDot = true;
      continue;
    }
    if (ch >= "0" && ch <= "9") {
      out += ch;
    }
  }
  return out;
}

// Parse string ke angka, kembalikan null jika tidak valid atau kosong
function parseNumber(s) {
  s = sanitizeRaw(s).trim();
  if (s === "") return null;
  const n = Number(s);
  return isFinite(n) ? n : null;
}

// Format field saat onblur dengan desimal tetap
function formatField(el, decimals) {
  const n = parseNumber(el.value);
  el.value = n === null ? "" : n.toFixed(decimals);
}

// Validasi + hitung jika semua ada
function updateCalculation() {
  werr.style.display = "none";
  verr.style.display = "none";
  weightEl.classList.remove("invalid");
  volumeEl.classList.remove("invalid");

  const N = parseNumber(normalEl.value);
  const W = parseNumber(weightEl.value);
  const V = parseNumber(volumeEl.value);

  if (N === null || W === null || V === null) {
    ffaEl.textContent = "0";
    return;
  }

  let hasError = false;
  if (W <= 0) {
    werr.textContent = "Berat sampel harus lebih dari 0.";
    werr.style.display = "block";
    weightEl.classList.add("invalid");
    hasError = true;
  }
  if (V < 0) {
    verr.textContent = "Volume harus positif.";
    verr.style.display = "block";
    volumeEl.classList.add("invalid");
    hasError = true;
  }

  if (hasError) {
    ffaEl.textContent = "0";
    return;
  }

  // Perhitungan: (Volume * Normalitas * 25.6) / Berat
  const ffa = (V * N * 25.6) / W;
  ffaEl.textContent = isFinite(ffa) ? ffa.toFixed(2) + " %" : "0";
}

// Handler saat input
function onInputHandler(e) {
  const el = e.target;
  const cursor = el.selectionStart;
  const old = el.value;
  const s = sanitizeRaw(old);
  if (s !== old) {
    el.value = s;
    el.setSelectionRange(cursor - 1, cursor - 1);
  }
  updateCalculation();
}

// Pasang event listeners
normalEl.addEventListener("input", onInputHandler);
weightEl.addEventListener("input", onInputHandler);
volumeEl.addEventListener("input", onInputHandler);

// Format on blur (saat fokus keluar dari input)
// **PERUBAHAN DI SINI:** Normalitas diatur ke 4 desimal
normalEl.addEventListener("blur", () => {
  formatField(normalEl, 4);
  updateCalculation();
});
weightEl.addEventListener("blur", () => {
  formatField(weightEl, 4);
  updateCalculation();
});
volumeEl.addEventListener("blur", () => {
  formatField(volumeEl, 2);
  updateCalculation();
});

// Reset hanya mengosongkan berat dan volume
resetBtn.addEventListener("click", () => {
  weightEl.value = "";
  volumeEl.value = "";
  werr.style.display = "none";
  verr.style.display = "none";
  weightEl.classList.remove("invalid");
  volumeEl.classList.remove("invalid");
  ffaEl.textContent = "0";
  weightEl.focus();
});

// Bersihkan input saat di-paste
[normalEl, weightEl, volumeEl].forEach((el) => {
  el.addEventListener("paste", (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text");
    el.value = sanitizeRaw(text);
    updateCalculation();
  });
});
