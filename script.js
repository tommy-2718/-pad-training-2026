var productData = [
  { id: 1,  name: "鉛筆A",         price: 60,  stock: 30, threshold: 40 },
  { id: 2,  name: "鉛筆B",         price: 70,  stock: 40, threshold: 40 },
  { id: 3,  name: "消しゴムA",     price: 100, stock: 10, threshold: 50 },
  { id: 4,  name: "消しゴムB",     price: 90,  stock: 40, threshold: 30 },
  { id: 5,  name: "シャープペンA", price: 120, stock: 16, threshold: 40 },
  { id: 6,  name: "シャープペンB", price: 300, stock: 13, threshold: 40 },
  { id: 7,  name: "シャープペンC", price: 360, stock: 25, threshold: 40 },
  { id: 8,  name: "シャープペンD", price: 700, stock: 25, threshold: 20 },
  { id: 9,  name: "ボールペンA",   price: 100, stock: 10, threshold: 30 },
  { id: 10, name: "ボールペンB",   price: 130, stock: 8,  threshold: 30 },
  { id: 11, name: "ボールペンC",   price: 160, stock: 30, threshold: 30 },
  { id: 12, name: "定規",          price: 100, stock: 40, threshold: 20 },
  { id: 13, name: "カッター",      price: 140, stock: 15, threshold: 20 },
  { id: 14, name: "ハサミ",        price: 130, stock: 25, threshold: 20 },
  { id: 15, name: "のり",          price: 100, stock: 30, threshold: 20 },
];

// 在庫数が発注基準以下なら「発注必要」、それ以外は「発注不要」
function orderStatus(item) {
  return item.stock <= item.threshold ? "発注必要" : "発注不要";
}

// -------- ログイン --------

function doLogin() {
  var user  = document.getElementById("loginUser").value;
  var pass  = document.getElementById("loginPassword").value;
  var errorEl = document.getElementById("loginError");

  if (user === "admin" && pass === "password") {
    errorEl.classList.remove("is-visible");
    document.getElementById("loginArea").style.display = "none";
    document.getElementById("mainArea").style.display  = "block";
    renderRows(productData);
    document.getElementById("resultCount").textContent = "全 " + productData.length + " 件";
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
    var matched = productData.filter(function (item) {
      var nameOk   = query     === "" || item.name.indexOf(query) !== -1;
      var statusOk = statusVal === "" || orderStatus(item) === statusVal;
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
    var status = orderStatus(item);
    var cls = status === "発注必要" ? "status-reorder" : "status-ok";
    return "<tr>"
      + "<td>" + item.id + "</td>"
      + "<td>" + item.name + "</td>"
      + "<td class=\"price\">" + item.price + "</td>"
      + "<td class=\"stock\">" + item.stock + "</td>"
      + "<td><span class=\"status-badge " + cls + "\">" + status + "</span></td>"
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
