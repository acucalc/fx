// DIBUAT OLEH AI GEMINI!!!
// 1. Deklarasi Elemen DOM (tetap sama)
const tonST1 = document.getElementById("tonST1");
const FFAST1 = document.getElementById("FFAST1");
const tonST2 = document.getElementById("tonST2");
const FFAST2 = document.getElementById("FFAST2");

const tonOT1 = document.getElementById("tonOT1");
const FFAOT1 = document.getElementById("FFAOT1");
const tonOT2 = document.getElementById("tonOT2");
const FFAOT2 = document.getElementById("FFAOT2");

const tonRec = document.getElementById("tonRec");
const FFARec = document.getElementById("FFARec");
const tonOER = document.getElementById("tonOER");
const FFAOER = document.getElementById("FFAOER");

const output = document.getElementById("output"); //Output

// 2. Kelompokkan Elemen ke dalam Pasangan
const inputPairs = [
  { ton: tonST1, ffa: FFAST1 },
  { ton: tonST2, ffa: FFAST2 },
  { ton: tonOT1, ffa: FFAOT1 },
  { ton: tonOT2, ffa: FFAOT2 },
  { ton: tonRec, ffa: FFARec },
  { ton: tonOER, ffa: FFAOER },
];

// 3. Gabungkan semua ID yang perlu dipantau dalam satu array
const allInputs = inputPairs.flatMap((pair) => [pair.ton, pair.ffa]);
console.log(allInputs);
// 4. Implementasi Logika Perhitungan dengan Validasi
const calculateFFA = () => {
  let totalTonFFA = 0;
  let totalTonase = 0;
  let anyValidPairExists = false; // Flag untuk memastikan setidaknya satu pasangan terisi

  inputPairs.forEach((pair) => {
    const tonValue = Number(pair.ton.value);
    const ffaValue = Number(pair.ffa.value);

    // VALIDASI KUNCI:
    // Cek apakah kedua input (TON dan FFA) BUKANLAH NaN (berarti bukan string kosong)
    // DAN nilainya lebih besar dari 0 (opsional, tapi baik untuk TON)
    const isTonFilled = !isNaN(tonValue) && tonValue > 0;
    const isFFAFilled = !isNaN(ffaValue) && ffaValue > 0;
    // Atau hanya: const isFFAFilled = !isNaN(ffaValue) && pair.ffa.value.trim() !== "";

    // Jika pasangan terisi LENGKAP, masukkan ke perhitungan.
    if (isTonFilled && isFFAFilled) {
      totalTonFFA += tonValue * ffaValue;
      totalTonase += tonValue;
      anyValidPairExists = true;
    }
    // Jika hanya salah satunya yang terisi, pasangan ini diabaikan (tidak masuk perhitungan).
  });

  // Tampilkan hasil HANYA jika totalTonase > 0 (setidaknya ada satu pasangan valid)
  if (totalTonase > 0) {
    const finalFFA = totalTonFFA / totalTonase;
    output.textContent = Math.round(finalFFA * 100) / 100;
  } else {
    // Jika tidak ada input valid, reset output atau tampilkan 0
    output.textContent = "0";
  }
};

// 5. Lampirkan Event Listener ke semua input
allInputs.forEach((input) => {
  // Gunakan 'input' untuk reaksi real-time atau 'change' untuk reaksi saat fokus hilang
  input.addEventListener("input", calculateFFA);
});

// Jalankan sekali saat memuat halaman untuk hasil awal (jika ada nilai default)
calculateFFA();
