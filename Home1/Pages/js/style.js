const authWrapper = document.querySelector('.auth-wrapper');
const loginTrigger = document.querySelector('.login-trigger');
const registerTrigger = document.querySelector('.register-trigger');

registerTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    authWrapper.classList.add('toggled');
});

loginTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    authWrapper.classList.remove('toggled');
});


/// عناصر النماذج
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// البيانات الافتراضية لتجربة تسجيل الدخول
let users = JSON.parse(localStorage.getItem("users")) || [];

// التعامل مع تسجيل الدخول
loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // البحث عن المستخدم
    const user = users.find(u => u.username === username && u.password === password);
    if(user){
        // حفظ بيانات البروفايل في LocalStorage
        localStorage.setItem("profileData", JSON.stringify({
            name: user.username,
            email: user.email,
            role: "Student",
            bio: "طالب مهتم بتطوير الويب، بناء الأنظمة التعليمية، والعمل على مشاريع Front-End و Back-End باستخدام أحدث التقنيات.",
            phone: "01000000000",
            city: "مصر",
            imageUrl: "https://i.imgur.com/1Xq9BiF.png",
            skills: { html: 80, css: 70, js: 60, csharp: 50 },
            interests: ["تطوير الويب الحديث", "الأنظمة التعليمية", "واجهات المستخدم UX/UI", "العمل الحر"]
        }));
        window.location.href = "profile.html";
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة!");
    }
});

// التعامل مع التسجيل
signupForm.addEventListener("submit", function(e){
    e.preventDefault();
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if(users.find(u => u.username === username)){
        alert("هذا المستخدم موجود بالفعل!");
        return;
    }

    // إضافة المستخدم الجديد
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("تم التسجيل بنجاح! يمكنك تسجيل الدخول الآن.");
    signupForm.reset();
});

