const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// INITIALIZE FOOD LIST
var foodList = [
  { name: "Biskuit", price: 6000, stock: 1 },
  { name: "Chips", price: 8000, stock: 1 },
  { name: "Oreo", price: 1000, stock: 1 },
  { name: "Tango", price: 12000, stock: 1 },
  { name: "Cokelat", price: 15000, stock: 1 },
];

// INITIALIZE MONEY FRACTION
var moneyFraction = [2000, 5000, 10000, 20000, 50000];

// INIT VARIABLE FOR TRANSACTION
let money = 0;
let errorMessage = "";

// FUNCTION FOR PRINT HEADER
function printInit() {
  console.log("=========================================");
  console.log("=== SELAMAT DATANG DI VENDING MACHINE ===");
  console.log("=========================================");
}

// FUNCTION FOR CHOOSE MENU
function chooseMenu() {
  console.clear();
  printInit();
  console.log(`--- JUMLAH UANG : RP ${money}`);
  console.log(`---- List Makanan`);
  foodList.map((item, key) => {
    console.log(`----- Nomor : ${key + 1}`);
    console.log(`----- Nama : ${item.name}`);
    console.log(`----- Harga : ${item.price}`);
    console.log(`----- Stock : ${item.stock}`);
    console.log("");
  });
  console.log(`Pilih ${foodList.length + 1} Untuk Batal`);
  console.log(`-----------------`);
  console.log("Pesan : ", errorMessage);
  rl.question("Silahkan Pilih Menu : ", function (value) {
    if (value <= 5 && value > 0) {
      let input = true;
      const stock = foodList[value - 1].stock;
      const name = foodList[value - 1].name;
      const price = foodList[value - 1].price;
      if (stock === 0) {
        errorMessage = `Stock ${name} Habis`;
        input = false;
      } else if (money < price) {
        errorMessage = "Uang anda kurang";
        input = false;
      }

      if (input) {
        foodList[value - 1].stock -= 1;
        console.clear();
        console.log("=======================================================");
        console.log("=== TERIMA KASIH TELANG MENGGUNAKAN VENDING MACHINE ===");
        console.log(`=== Silahkan Ambil ${name} dibawah`);
        console.log(`=== Uang Kembalian Rp. ${money - price}`);
        console.log("");
        console.log("");
        rl.question("Tekan [Enter] untuk selesai", function () {
          money = 0;
          errorMessage = "";
          main();
        });
      } else {
        chooseMenu();
      }
    } else if (parseInt(value) === foodList.length + 1) {
      console.clear();
      console.log("=======================================================");
      console.log("=== TERIMA KASIH TELANG MENGGUNAKAN VENDING MACHINE ===");
      console.log(`=== Silahkan Ambil Uangnya Rp. ${money}`);
      rl.question("Tekan [Enter] untuk selesai", function () {
        money = 0;
        errorMessage = "";
        main();
      });
    } else {
      errorMessage = "Pilihan Menu Tidak Ada";
      chooseMenu();
    }
  });
}

// FUNCTION FOR FIRST TIME RUN PROGRAM
function main() {
  console.clear();
  printInit();
  console.log(`--- JUMLAH UANG : RP ${money}`);
  console.log(`Pilih 1 = SELANJUTNYA`);
  console.log(`Pilih 2 = BATAL`);
  console.log("Pesan : ", errorMessage);
  rl.question("Silahkan Masukkan Uang : ", function (value) {
    if (value == 1) {
      if (money > 0) chooseMenu();
      else {
        errorMessage = "Masukkan Uang Terlebih Dahulu";
        main();
      }
    } else if (value == 2) {
      console.log("=======================================================");
      console.log("=== TERIMA KASIH TELANG MENGGUNAKAN VENDING MACHINE ===");
      console.log(`=== Silahkan Ambil Uangnya Rp. ${money}`);
      rl.question("Tekan [Enter] untuk selesai", function () {
        money = 0;
        errorMessage = "";
        main();
      });
    } else {
      // masukkan uang
      let fractionInput = false;
      moneyFraction.map((item) => {
        if (parseInt(value) === item) {
          fractionInput = true;
        }
      });
      if (fractionInput) {
        money += parseInt(value);
        errorMessage = "";
      } else {
        errorMessage = "Uang Pecahan Tidak Diterima";
      }
      main();
    }
  });
}

// RUNNING PROGRAM
main();
