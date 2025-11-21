// gallery.js
// Upload foto ke Firebase Storage + simpan metadata ke Firestore

import { db, storage } from "./firebase.js";

const uploadForm = document.getElementById("uploadForm");
const photoFile = document.getElementById("photoFile");
const photoTitle = document.getElementById("photoTitle");
const uploadStatus = document.getElementById("uploadStatus");
const photoGallery = document.getElementById("photoGallery");

// ============================
// UPLOAD FOTO
// ============================
uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = photoFile.files[0];
  const title = photoTitle.value;

  if (!file) return alert("Pilih file terlebih dahulu!");

  uploadStatus.textContent = "Mengupload...";

  try {
    // lokasi penyimpanan
    const storageRef = storage.ref(`galeri/${Date.now()}_${file.name}`);

    // upload file
    await storageRef.put(file);

    // ambil url download
    const downloadURL = await storageRef.getDownloadURL();

    // simpan metadata ke Firestore
    await db.collection("galeri").add({
      title,
      url: downloadURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    uploadStatus.textContent = "Upload berhasil!";
    uploadForm.reset();
    loadPhotos();
  } catch (err) {
    uploadStatus.textContent = "Gagal upload!";
    console.error(err);
  }
});

// ============================
// LOAD FOTO DARI FIRESTORE
// ============================
async function loadPhotos() {
  photoGallery.innerHTML = "Memuat data...";

  const snapshot = await db
    .collection("galeri")
    .orderBy("createdAt", "desc")
    .get();

  if (snapshot.empty) {
    photoGallery.innerHTML = "<p>Belum ada foto.</p>";
    return;
  }

  photoGallery.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();
    const card = document.createElement("div");
    card.className = "photo-card";
    card.innerHTML = `
      <img src="${data.url}" alt="${data.title}" />
      <p>${data.title}</p>
    `;
    photoGallery.appendChild(card);
  });
}

// Load saat halaman dibuka
window.onload = loadPhotos;