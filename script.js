// ================================
// Translation dictionary
// ================================
const translations = {
  ar: {
    title: "حاسبة المنظومة الشمسية",
    subtitle: "اختر وضع الحساب ثم أدخل القيم المطلوبة",
    systems: { onGrid: "24 ساعة", farm: "المضخات", hybrid: "بطاريات" },
    inputs: {
      morningAmp: "الأمبير المطلوب صباحاً",
      eveningAmp: "الأمبير المطلوب ليلاً",
      nightHours: "عدد ساعات التشغيل الليلي",
      pumpHP: "سعة المضخة (حصان)"
    },
    calculate: "حساب",
    reset: "إعادة",
    results: {
      header: "النتائج",
      size: "حجم المنظومة",
      panels: "عدد الألواح",
      inverter: "سعر الإنفرتر",
      batteries: "عدد البطاريات",
      install: "تكلفة التنصيب والضمان",
      total: "الكلفة الكلية"
    }
  },
  en: {
    title: "Solar System Calculator",
    subtitle: "Choose mode and enter values",
    systems: { onGrid: "On-Grid 24h", farm: "Farm Pumps", hybrid: "Hybrid with Batteries" },
    inputs: {
      morningAmp: "Morning Amps",
      eveningAmp: "Night Amps",
      nightHours: "Night Hours",
      pumpHP: "Pump Size (HP)"
    },
    calculate: "Calculate",
    reset: "Reset",
    results: {
      header: "Results",
      size: "System Size",
      panels: "Panels",
      inverter: "Inverter Price",
      batteries: "Batteries",
      install: "Installation",
      total: "Total Cost"
    }
  },
  ku: {
    title: "ژماردنی سیستەمی خۆرەوە",
    subtitle: "جۆری سیستەمەکە هەڵبژێرە و نرخی تێدای بنووسە",
    systems: { onGrid: "24 کاتژمێر", farm: "پمپی زەوی", hybrid: "سیستەمی هايبریدی بە باتری" },
    inputs: {
      morningAmp: "ئامپێری بەیانی",
      eveningAmp: "ئامپێری شەو",
      nightHours: "کاتژمێرەکانی شەو",
      pumpHP: "قەبارەی پمپ (هێپ)"
    },
    calculate: "ژمێرە",
    reset: "دووبارەکردنەوە",
    results: {
      header: "ئەنجامەکان",
      size: "قەبارەی سیستەم",
      panels: "ژمارەی پەنێڵەکان",
      inverter: "نرخی ئینڤێرتەر",
      batteries: "باتریەکان",
      install: "تێچوی دامەزراندن",
      total: "کۆی گشتی"
    }
  },
  tr: {
    title: "Güneş Sistemi Hesaplayıcı",
    subtitle: "Mod seçin ve değerleri girin",
    systems: { onGrid: "Şebeke 24 Saat", farm: "Çiftlik Pompaları", hybrid: "Bataryalı Hibrit" },
    inputs: {
      morningAmp: "Sabah Amperleri",
      eveningAmp: "Gece Amperleri",
      nightHours: "Gece Saatleri",
      pumpHP: "Pompa Gücü (HP)"
    },
    calculate: "Hesapla",
    reset: "Sıfırla",
    results: {
      header: "Sonuçlar",
      size: "Sistem Boyutu",
      panels: "Panel Sayısı",
      inverter: "İnvertör Fiyatı",
      batteries: "Bataryalar",
      install: "Kurulum Maliyeti",
      total: "Toplam Maliyet"
    }
  }
};

// Elements
const langSelect = document.getElementById("language");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const inputsDiv = document.getElementById("inputs");
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const resultsDiv = document.getElementById("results");
const systemButtons = document.querySelectorAll(".system-choice button");

let currentSystem = "onGrid";

// Update Language
function updateLanguage(lang) {
  const t = translations[lang];
  title.textContent = t.title;
  subtitle.textContent = t.subtitle;

  systemButtons[0].textContent = t.systems.onGrid;
  systemButtons[1].textContent = t.systems.farm;
  systemButtons[2].textContent = t.systems.hybrid;

  calculateBtn.textContent = t.calculate;
  resetBtn.textContent = t.reset;
  renderInputs();

    // RTL support
  if (lang === "ar" || lang === "ku") {
    document.body.classList.add("rtl");
  } else {
    document.body.classList.remove("rtl");
  }

}

langSelect.addEventListener("change", () => updateLanguage(langSelect.value));

// Inputs render
function renderInputs() {
  const lang = langSelect.value;
  const t = translations[lang].inputs;
  inputsDiv.innerHTML = "";

  if (currentSystem === "onGrid") {
    inputsDiv.innerHTML = `<label>${t.morningAmp}:</label><input type="number" id="morningAmp"/>`;
  } else if (currentSystem === "farm") {
    inputsDiv.innerHTML = `<label>${t.pumpHP}:</label><input type="number" id="pumpHP"/>`;
  } else {
    inputsDiv.innerHTML = `
      <label>${t.morningAmp}:</label><input type="number" id="morningAmp"/>
      <label>${t.eveningAmp}:</label><input type="number" id="eveningAmp"/>
      <label>${t.nightHours}:</label><input type="number" id="nightHours"/>
    `;
  }
}

// Change system
systemButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    systemButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentSystem = btn.dataset.system;
    renderInputs();
  });
});

// Round to nearest even number
function roundEven(num) {
  return Math.round(num / 2) * 2;
}

// Same calculation functions as before (onGrid, farm, hybrid)...

// Display Results
function showResults(result) {
  const lang = langSelect.value;
  const t = translations[lang].results;

  resultsDiv.innerHTML = `
    <h3>${t.header}</h3>
    <p>${t.size}: ${result.kw.toFixed(2)} kW</p>
    <p>${t.panels}: ${result.panels}</p>
    <p>${t.inverter}: $${result.inverter}</p>
    ${result.batteries ? `<p>${t.batteries}: ${result.batteries}</p>` : ""}
    <p>${t.install}: $${result.install.toFixed(2)}</p>
    <p><strong>${t.total}: $${result.cost.toFixed(2)}</strong></p>
  `;
}

// Reset
resetBtn.addEventListener("click", () => {
  inputsDiv.innerHTML = "";
  resultsDiv.innerHTML = "";
});

// Init
updateLanguage("ar");

// ================================
// الحسابات
// ================================

// تقريب لأقرب رقم زوجي
function roundEven(num) {
  return Math.round(num / 2) * 2;
}

// On-Grid
function calcOnGrid(amps) {
  const kw = (amps * 230 * 1.28) / 1000;
  const panels = roundEven(kw * 1000 / 615);

  let inverter = 0;
  if (kw >= 10 && kw <= 25) inverter = 750;
  else if (kw <= 35) inverter = 1050;
  else if (kw <= 55) inverter = 1650;
  else if (kw <= 75) inverter = 1900;
  else inverter = 3600;

  const install = (kw * 100) / 2;
  const cost = ((68 + 23 + 30) * panels) + inverter + 600 + install;

  return { kw, panels, inverter, install, cost };
}

// Farm
function calcFarm(hp) {
  const kw = hp * 0.75 * 1.4;
  const panels = roundEven(kw * 1000 / 615);

  let inverter = 0;
  if (kw >= 15 && kw <= 30) inverter = 450;
  else if (kw <= 37) inverter = 700;
  else if (kw <= 45) inverter = 880;
  else if (kw <= 55) inverter = 950;
  else inverter = 1120;

  const install = (kw * 100) / 2;
  const cost = ((68 + 23 + 30) * panels) + inverter + 600 + install;

  return { kw, panels, inverter, install, cost };
}

// Hybrid
function calcHybrid(morningAmp, nightAmp, hours) {
  const kw = (morningAmp * 230 * 1.28) / 1000;
  const panels = roundEven(kw * 1000 / 615);

  // Inverter pricing
  let inverter = 0;
  if (kw <= 6) inverter = 850;
  else if (kw <= 9) inverter = 1120;
  else if (kw <= 13) inverter = 1650;
  else if (kw <= 17) inverter = 2110;
  else if (kw <= 22) inverter = 2500;
  else if (kw <= 33) inverter = 3300;
  else if (kw <= 53) inverter = 4580;
  else inverter = 6690;

  // Battery calculation
  const batteryCapacity = (nightAmp * 230 * hours) / 0.8;
  const batteries = Math.round(batteryCapacity / 10000);
  const batteryCost = batteries * 1000;

  const install = (kw * 100) / 2;
  const cost = ((68 + 23 + 30) * panels) + inverter + 600 + install + batteryCost;

  return { kw, panels, inverter, batteries, batteryCapacity, install, cost };
}

// ================================
// عرض النتائج
// ================================
function showResults(result) {
  const lang = langSelect.value;
  const t = translations[lang].results;

  resultsDiv.innerHTML = `
    <h3>${t.header}</h3>
    <p>${t.size}: ${result.kw.toFixed(2)} kW</p>
    <p>${t.panels}: ${result.panels}</p>
    <p>${t.inverter}: $${result.inverter}</p>
    ${result.batteries ? `<p>${t.batteries}: ${result.batteries}</p>` : ""}
    <p>${t.install}: $${result.install.toFixed(2)}</p>
    <p><strong>${t.total}: $${result.cost.toFixed(2)}</strong></p>
  `;
}

// ================================
// زر الحساب
// ================================
calculateBtn.addEventListener("click", () => {
  let result;

  if (currentSystem === "onGrid") {
    const amps = parseFloat(document.getElementById("morningAmp").value);
    if (!amps) return;
    result = calcOnGrid(amps);
  } else if (currentSystem === "farm") {
    const hp = parseFloat(document.getElementById("pumpHP").value);
    if (!hp) return;
    result = calcFarm(hp);
  } else {
    const morningAmp = parseFloat(document.getElementById("morningAmp").value);
    const nightAmp = parseFloat(document.getElementById("eveningAmp").value);
    const hours = parseFloat(document.getElementById("nightHours").value);
    if (!morningAmp || !nightAmp || !hours) return;
    result = calcHybrid(morningAmp, nightAmp, hours);
  }

  showResults(result);
});
