function $(id) {
    return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", () => {

    let result = localStorage.getItem("lastQuizResult");
    let weaknesses = localStorage.getItem("studyWeaknesses");

    try { result = JSON.parse(result); } catch { result = null; }
    try { weaknesses = JSON.parse(weaknesses); } catch { weaknesses = []; }

    if (!result) {
        $("score").textContent = "لا توجد نتيجة محفوظة.";
        $("improveBtn").style.display = weaknesses.length ? "inline-block" : "none";
        return;
    }

    const score = result.score ?? 0;
    const total = result.total ?? 0;
    const percent = total > 0 ? Math.round((score / total) * 100) : 0;

    $("score").textContent = `العلامة: ${score} / ${total}`;
    $("percent").textContent = `النسبة: ${percent}%`;

    // عرض الأخطاء
    if (Array.isArray(result.wrong) && result.wrong.length > 0) {
        $("wrong").textContent =
            "الأسئلة الخاطئة: " + result.wrong.join(" - ");
    }

    // التقييم
    if (percent >= 75) $("rate").textContent = "ممتاز 🌟";
    else if (percent >= 50) $("rate").textContent = "جيد 👍";
    else $("rate").textContent = "ضعيف ❗";

    // إظهار زر التحسين
    if (percent < 50 || (weaknesses && weaknesses.length > 0)) {
        $("improveBtn").style.display = "inline-block";
    }
});

// ✅ دالة واحدة فقط لحفظ النتائج (لـ Dashboard C#)
function saveResult(subject, score) {

    let results = JSON.parse(localStorage.getItem("quizResults")) || [];

    results.push({
        subject: subject,
        score: score,
        date: new Date().toISOString()
    });

    localStorage.setItem("quizResults", JSON.stringify(results));
}

// ✅ دالة تحسين الخطة
function improve() {

    const weaknesses = JSON.parse(localStorage.getItem("studyWeaknesses") || "[]");
    const box = $("improvement");

    if (!weaknesses.length) {
        box.innerHTML = "<p>لا توجد نقاط ضعف مسجلة.</p>";
        return;
    }

    let html = "<h3>نقاط تحتاج تحسين:</h3>";

    weaknesses.forEach(w => {
        html += `
            <div style="background:#eef3ff;padding:10px;margin:6px 0;border-radius:6px">
                ${w}
            </div>`;
    });

    box.innerHTML = html;

    // تخزينها في جدول المذاكرة
    localStorage.setItem("studyPlanSuggestions",
        JSON.stringify(weaknesses)
    );
}