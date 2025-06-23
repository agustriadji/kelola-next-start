# 🧭 Dashboard Menu Configurator

Sebuah fitur konfigurasi menu sidebar dashboard berbasis **Next.js v15** yang memungkinkan pengguna untuk:

- Menambah dan mengedit menu sidebar secara fleksibel
- Menyusun struktur menu **secara hierarki (parent-child)** dengan **drag-and-drop**
- Menyimpan konfigurasi menu ke **IndexedDB** secara lokal
- Melihat preview menu yang langsung memengaruhi sidebar dashboard
- Reset perubahan kapan saja

---

## 🚀 Fitur Utama

✅ **Tree View Drag & Drop**  
Gunakan DnD Kit untuk mengatur posisi menu (reorder dan reparent).

✅ **Add/Edit Menu Dialog**  
Dialog form untuk menambah atau mengedit menu, lengkap dengan icon, nama, dan parent.

✅ **Persistent via IndexedDB**  
Konfigurasi disimpan secara lokal di browser menggunakan IndexedDB (via custom utils).

✅ **Dynamic Sidebar Rendering**  
Sidebar di halaman dashboard langsung mencerminkan struktur menu terbaru.

✅ **Reset/Save Change**  
Tombol `Reset` untuk membatalkan perubahan, `Save Change` untuk menyimpan permanen.

---

## 🛠️ Tech Stack

- **Next.js 15** (App Router)
- **Zustand** (State Management)
- **DnD Kit** (Drag and Drop Tree)
- **Radix UI** (Dialog, Dropdown)
- **Lucide React** (Icons)
- **IndexedDB** (Storage via custom `idb.ts`)
- **Tailwind CSS** (UI Styling)

---

## 📁 Struktur Folder Penting

```bash
src/
├── app/
│   ├── dashboard/          # Halaman dashboard utama
│   └── settings/menu/      # Halaman konfigurasi menu
├── components/
│   ├── AppBar.tsx          # Topbar dengan logo dan menu user
│   ├── MenuTree.tsx        # Komponen drag & drop tree
│   └── SidebarMenu.tsx     # Komponen sidebar dinamis
├── store/
│   └── menuStore.ts        # Zustand store untuk menuTree
├── utils/
│   └── idb.ts              # Fungsi penyimpanan ke IndexedDB
```

# 1. Install dependencies

yarn install

# 2. Jalankan development server

yarn dev

# 3. Buka di browser

http://localhost:3000
