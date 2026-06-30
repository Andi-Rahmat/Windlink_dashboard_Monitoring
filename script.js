// --- 1. FITUR BUKA-TUTUP SIDEBAR (Desktop & Mobile) ---
const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");
const overlay = document.getElementById("sidebarOverlay");

toggleBtn.addEventListener("click", () => {
  // Jika dibuka di layar HP
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle("mobile-open");
    overlay.classList.toggle("active");
  }
  // Jika dibuka di Layar Laptop
  else {
    sidebar.classList.toggle("collapsed");
    mainContent.classList.toggle("expanded");
  }

  setTimeout(() => {
    window.dispatchEvent(new Event("resize"));
  }, 300);
});

// Fitur tutup otomatis kalau layar gelap (overlay) di-klik di HP
if (overlay) {
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("mobile-open");
    overlay.classList.remove("active");
  });
}

// --- 2. FUNGSI NAVIGASI MENU (SPA LOGIC) ---
function switchMenu(pageId, element) {
  let links = document.querySelectorAll(".nav-link");
  links.forEach((link) => link.classList.remove("active"));
  element.classList.add("active");

  let pages = document.querySelectorAll(".page-section");
  pages.forEach((page) => page.classList.remove("active"));
  document.getElementById("page-" + pageId).classList.add("active");

  // Otomatis menutup sidebar di HP setelah menu dipilih
  if (window.innerWidth <= 768) {
    sidebar.classList.remove("mobile-open");
    overlay.classList.remove("active");
  }
}

// --- 3. SETUP CHART.JS (Dark Mode) ---
Chart.defaults.color = "#9a9a9a";
Chart.defaults.borderColor = "#33334a";

const ctxRealtime = document.getElementById("realtimeChart").getContext("2d");
let realtimeData = [15, 18, 22, 20, 25, 26, 24, 28, 26, 27];
let labels = [
  "14:20",
  "14:21",
  "14:22",
  "14:23",
  "14:24",
  "14:25",
  "14:26",
  "14:27",
  "14:28",
  "14:29",
];

const realtimeChart = new Chart(ctxRealtime, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Daya Output (W)",
        data: realtimeData,
        borderColor: "#00f2c3",
        backgroundColor: "rgba(0, 242, 195, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false /* Penting agar grafik tidak gepeng di HP */,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, max: 35 } },
  },
});

const ctxStatus = document.getElementById("statusChart").getContext("2d");
new Chart(ctxStatus, {
  type: "doughnut",
  data: {
    labels: ["Optimal", "Loss"],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: ["#00f2c3", "#33334a"],
        borderWidth: 0,
        cutout: "80%",
      },
    ],
  },
  options: {
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  },
});

const ctxHistory = document.getElementById("historyChart").getContext("2d");
new Chart(ctxHistory, {
  type: "bar",
  data: {
    labels: ["Kam", "Jum", "Sab", "Min", "Sen", "Sel", "Rab"],
    datasets: [
      {
        label: "Energi (Wh)",
        data: [150, 180, 220, 190, 240, 160, 310],
        backgroundColor: "#00f2c3",
        borderRadius: 5,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false } } },
  },
});

// --- 4. SIMULASI DATA REAL-TIME ---
setInterval(() => {
  let newWatt = (20 + Math.random() * 10).toFixed(1);
  let newVolt = (12.0 + Math.random() * 0.8).toFixed(1);
  let newAmpere = (newWatt / newVolt).toFixed(2);
  let newWind = (4.0 + Math.random() * 3.0).toFixed(1);

  document.getElementById("val-watt").innerText = newWatt;
  document.getElementById("val-volt").innerText = newVolt;
  document.getElementById("val-ampere").innerText = newAmpere;
  document.getElementById("val-wind").innerText = newWind;

  realtimeChart.data.datasets[0].data.shift();
  realtimeChart.data.datasets[0].data.push(newWatt);

  let now = new Date();
  let timeStr =
    now.getHours() +
    ":" +
    String(now.getMinutes()).padStart(2, "0") +
    ":" +
    String(now.getSeconds()).padStart(2, "0");
  realtimeChart.data.labels.shift();
  realtimeChart.data.labels.push(timeStr);

  realtimeChart.update();
}, 3000);

// --- 5. SIMULASI API CUACA BMKG ---
function renderHourlyForecast() {
  const container = document.getElementById("forecastScroll");
  container.innerHTML = "";

  const forecastData = [
    {
      time: "21.00",
      icon: "fa-moon text-warning",
      temp: 25,
      hum: 77,
      speed: 6.6,
      dir: "Barat Daya",
      iconDir: "fa-arrow-trend-up",
    },
    {
      time: "22.00",
      icon: "fa-moon text-warning",
      temp: 24,
      hum: 80,
      speed: 6.6,
      dir: "Barat Daya",
      iconDir: "fa-arrow-trend-up",
    },
    {
      time: "23.00",
      icon: "fa-cloud-moon text-secondary",
      temp: 23,
      hum: 81,
      speed: 6.8,
      dir: "Barat Daya",
      iconDir: "fa-arrow-trend-up",
    },
    {
      time: "00.00",
      icon: "fa-cloud-moon text-secondary",
      temp: 23,
      hum: 82,
      speed: 6.8,
      dir: "Barat Daya",
      iconDir: "fa-arrow-trend-up",
    },
    {
      time: "01.00",
      icon: "fa-moon text-warning",
      temp: 23,
      hum: 85,
      speed: 6.8,
      dir: "Barat Daya",
      iconDir: "fa-arrow-trend-up",
    },
    {
      time: "04.00",
      icon: "fa-moon text-warning",
      temp: 22,
      hum: 88,
      speed: 5.9,
      dir: "Selatan",
      iconDir: "fa-arrow-up",
    },
    {
      time: "07.00",
      icon: "fa-cloud-sun text-info",
      temp: 25,
      hum: 66,
      speed: 7.6,
      dir: "Barat Daya",
      iconDir: "fa-arrow-trend-up",
    },
    {
      time: "10.00",
      icon: "fa-sun text-warning",
      temp: 30,
      hum: 43,
      speed: 2.2,
      dir: "Barat",
      iconDir: "fa-arrow-right",
    },
    {
      time: "13.00",
      icon: "fa-sun text-warning",
      temp: 31,
      hum: 42,
      speed: 10.9,
      dir: "Timur",
      iconDir: "fa-arrow-left",
    },
  ];

  forecastData.forEach((data) => {
    const itemHTML = `
            <div class="forecast-item">
                <div class="forecast-time">${data.time}</div>
                <div class="forecast-icon"><i class="fa-solid ${data.icon}"></i></div>
                <div class="forecast-temp">${data.temp}°</div>
                <div class="forecast-hum">${data.hum}%</div>
                <div class="mt-3 text-muted" style="font-size: 10px; text-transform: uppercase;">Angin</div>
                <div class="forecast-wind-speed">${data.speed} <span style="font-size:10px; font-weight:normal;">km/j</span></div>
                <div class="forecast-wind-dir">${data.dir} <i class="fa-solid ${data.iconDir} ms-1"></i></div>
            </div>
        `;
    container.innerHTML += itemHTML;
  });
}
//only bmkg data simulation
// --- KONFIGURASI API CUACA OPENWEATHERMAP ---
// Ganti teks 'MASUKKAN_API_KEY_ANDA_DISINI' dengan kunci asli milik Anda
const API_KEY = "68bb1d1066aa2ce7c766856ee1d73cfa";

// Koordinat Kabupaten Sampang, Jawa Timur
const LAT = -7.275782;
const LON = 112.793779;

// --- 5. SIMULASI API CUACA OPENWEATHERMAP ---

async function fetchBMKGData() {
  // Menyalakan efek loading
  document.getElementById("weatherDataCurrent").style.opacity = "0.5";
  document.getElementById("forecastScroll").style.opacity = "0.5";
  document.getElementById("loadingWeather").style.display = "inline-block";

  try {
    // 1. MENGAMBIL DATA CUACA SAAT INI
    const resCurrent = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric&lang=id`,
    );
    const dataCurrent = await resCurrent.json();

    // Mengganti teks HTML untuk cuaca saat ini
    document.getElementById("bmkg-temp").innerText =
      Math.round(dataCurrent.main.temp) + " °C";
    document.getElementById("bmkg-kondisi").innerHTML =
      `${dataCurrent.weather[0].description.toUpperCase()} <span class="text-muted mx-2">•</span> di Pesisir Sampang`;
    document.getElementById("api-hum").innerText =
      dataCurrent.main.humidity + "%";
    document.getElementById("api-wind").innerText =
      dataCurrent.wind.speed + " m/s";
    document.getElementById("api-dir").innerText = dataCurrent.wind.deg + "°";

    // Mengatur Ikon Cuaca Saat Ini
    let weatherIcon = "fa-cloud";
    const iconCode = dataCurrent.weather[0].icon;
    if (iconCode.includes("01")) weatherIcon = "fa-sun text-warning";
    else if (iconCode.includes("02")) weatherIcon = "fa-cloud-sun text-info";
    else if (iconCode.includes("03") || iconCode.includes("04"))
      weatherIcon = "fa-cloud text-secondary";
    else if (iconCode.includes("09") || iconCode.includes("10"))
      weatherIcon = "fa-cloud-rain text-primary";
    else if (iconCode.includes("11")) weatherIcon = "fa-cloud-bolt text-danger";

    document.querySelector(".bmkg-main-icon").className =
      `fa-solid ${weatherIcon} bmkg-main-icon`;

    // 2. MENGAMBIL DATA PRAKIRAAN CUACA (FORECAST)
    const resForecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric&lang=id`,
    );
    const dataForecast = await resForecast.json();

    // Memanggil fungsi untuk menampilkan prediksi ke layar
    renderHourlyForecast(dataForecast.list);
  } catch (error) {
    console.error("Gagal menarik data cuaca:", error);
    document.getElementById("bmkg-kondisi").innerText = "Gagal memuat data API";
  } finally {
    // Mematikan efek loading
    document.getElementById("weatherDataCurrent").style.opacity = "1";
    document.getElementById("forecastScroll").style.opacity = "1";
    document.getElementById("loadingWeather").style.display = "none";
  }
}

// Fungsi untuk mencetak prediksi ke dalam kotak horizontal
function renderHourlyForecast(forecastList) {
  const container = document.getElementById("forecastScroll");
  container.innerHTML = "";

  // OpenWeather API memberikan data per 3 jam.
  // Kita ambil 8 data pertama untuk menampilkan prediksi 24 jam ke depan.
  const next24Hours = forecastList.slice(0, 8);

  next24Hours.forEach((data) => {
    // Mengubah format waktu asli (misal: "2023-10-25 09:00:00") menjadi hanya jamnya saja ("09.00")
    const dateObj = new Date(data.dt_txt);
    const timeStr = String(dateObj.getHours()).padStart(2, "0") + ".00";

    // Menentukan Ikon untuk tiap jam prediksi
    let iconCode = data.weather[0].icon;
    let iconClass = "fa-cloud text-secondary"; // Default mendung
    if (iconCode.includes("01")) iconClass = "fa-moon text-warning"; // Akan kita buat lebih presisi nanti
    if (iconCode.includes("01") && iconCode.includes("d"))
      iconClass = "fa-sun text-warning";
    else if (iconCode.includes("02")) iconClass = "fa-cloud-sun text-info";
    else if (iconCode.includes("09") || iconCode.includes("10"))
      iconClass = "fa-cloud-rain text-primary";
    else if (iconCode.includes("11")) iconClass = "fa-cloud-bolt text-danger";

    // Membuat elemen HTML untuk dimasukkan ke kotak
    const itemHTML = `
            <div class="forecast-item">
                <div class="forecast-time">${timeStr}</div>
                <div class="forecast-icon"><i class="fa-solid ${iconClass}"></i></div>
                <div class="forecast-temp">${Math.round(data.main.temp)}°</div>
                <div class="forecast-hum">${data.main.humidity}%</div>
                <div class="mt-3 text-muted" style="font-size: 10px; text-transform: uppercase;">Angin</div>
                <div class="forecast-wind-speed">${data.wind.speed} <span style="font-size:10px; font-weight:normal;">m/s</span></div>
                <div class="forecast-wind-dir">${data.wind.deg}°</div>
            </div>
        `;
    container.innerHTML += itemHTML;
  });
}
