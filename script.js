var invoiceData = [
  { customer: "山田商事",   amount: 150000, status: "支払済" },
  { customer: "田中工業",   amount: 320000, status: "未払い" },
  { customer: "鈴木物産",   amount: 85000,  status: "支払済" },
  { customer: "佐藤建設",   amount: 470000, status: "支払い期限超過" },
  { customer: "高橋製作所", amount: 210000, status: "未払い" },
  { customer: "佐々木商店", amount: 95000,  status: "支払済" },
  { customer: "渡辺食品",   amount: 130000, status: "支払済" },
  { customer: "中村電機",   amount: 560000, status: "未払い" },
  { customer: "小林印刷",   amount: 42000,  status: "支払い期限超過" },
  { customer: "加藤運送",   amount: 188000, status: "支払済" },
];

// -------- ログイン --------

function doLogin() {
  var user  = document.getElementById("loginUser").value;
  var pass  = document.getElementById("loginPassword").value;
  var errorEl = document.getElementById("loginError");

  if (user === "admin" && pass === "password") {
    errorEl.classList.remove("is-visible");
    document.getElementById("loginArea").style.display = "none";
    document.getElementById("mainArea").style.display  = "block";
    renderRows(invoiceData);
    document.getElementById("resultCount").textContent = "全 " + invoiceData.length + " 件";
  } else {
    errorEl.classList.add("is-visible");
  }
}

// -------- 検索 --------

function search() {
  var query     = document.getElementById("searchInput").value.trim();
  var statusVal = document.getElementById("statusFilter").value;
  var countEl   = document.getElementById("resultCount");

  countEl.textContent = "検索中...";

  setTimeout(function () {
    var matched = invoiceData.filter(function (item) {
      var nameOk   = query     === "" || item.customer.indexOf(query) !== -1;
      var statusOk = statusVal === "" || item.status === statusVal;
      return nameOk && statusOk;
    });

    if (matched.length === 0) {
      countEl.textContent = "0 件";
    } else {
      countEl.textContent = matched.length + " 件見つかりました";
    }

    renderRows(matched);
  }, 500);
}

// -------- 描画 --------

function renderRows(data) {
  var tbody        = document.getElementById("results");
  var tableWrapper = document.querySelector(".table-wrapper");
  var noResult     = document.getElementById("noResultMessage");

  if (data.length === 0) {
    tbody.innerHTML          = "";
    tableWrapper.style.display = "none";
    noResult.style.display     = "block";
    return;
  }

  noResult.style.display     = "none";
  tableWrapper.style.display = "block";

  tbody.innerHTML = data.map(function (item) {
    var cls = item.status === "支払済"         ? "status-paid"
            : item.status === "未払い"          ? "status-unpaid"
            :                                     "status-overdue";
    return "<tr>"
      + "<td>" + item.customer + "</td>"
      + "<td class=\"amount\">¥" + item.amount.toLocaleString() + "</td>"
      + "<td><span class=\"status-badge " + cls + "\">" + item.status + "</span></td>"
      + "</tr>";
  }).join("");
}

// -------- イベント登録 --------

document.addEventListener("DOMContentLoaded", function () {
  // ログイン画面：Enter キー
  ["loginUser", "loginPassword"].forEach(function (id) {
    document.getElementById(id).addEventListener("keydown", function (e) {
      if (e.key === "Enter") doLogin();
    });
  });

  // 検索画面：Enter キー
  document.getElementById("searchInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") search();
  });
});
