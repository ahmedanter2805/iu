document.getElementById("openSaved").addEventListener("click", () => {
    const saved = JSON.parse(localStorage.getItem("studyplanSuggesitions") || "[]");

document.getElementById('addBtn').addEventListener('click', () => addRow());
document.getElementById('openSaved').addEventListener('click', openSavedSchedule);

    if (saved.length === 0) {
        alert("No saved schedule found!");
        return;
    }

    // فتح نافذة جديدة
    const win = window.open("", "_blank");

    // كتابة الهيكل بالكامل داخل النافذة
    win.document.write(`
        <html>
            <head>
                <title>Saved Study Schedule</title>
                <style>
                    body { font-family: Inter, sans-serif; padding:20px; background:#eef3ff; }
                    h2 { text-align:center; color:#2a4d9b; }
                    table { width:100%; border-collapse:collapse; background:white; border-radius:10px; overflow:hidden; }
                    th, td { padding:12px; border:1px solid #ddd; text-align:center; }
                    th { background:#3973ff; color:white; }
                    tr:nth-child(even) { background:#f5f7ff; }
                </style>
            </head>
            <body>
                <h2>Your Saved Study Schedule</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Day</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${
                            saved.map(r => `
                                <tr>
                                    <td>${r.subject || "-"}</td>
                                    <td>${r.day || "-"}</td>
                                    <td>${r.date || "-"}</td>
                                    <td>${r.time || "-"}</td>
                                </tr>
                            `).join("")
                        }
                    </tbody>
                </table>
            </body>
        </html>
    `);

    win.document.close();
});