// Détection de la langue et traduction automatique
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour mettre à jour le logo selon le thème
    function updateLogoForTheme() {
        const logo = document.getElementById('instagram-logo');
        if (logo) {
            const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (isDarkMode) {
                logo.src = './img/instagram1.png'; // Logo pour mode sombre
            } else {
                logo.src = './img/instagram2.png'; // Logo pour mode clair
            }
        }
    }

    // Fonction pour vérifier si les deux champs sont remplis
    function checkInputs() {
        const usernameInput = document.getElementById('username-input');
        const passwordInput = document.getElementById('password-input');
        const loginButton = document.getElementById('login-button');
        
        if (usernameInput && passwordInput && loginButton) {
            const isFilled = usernameInput.value.trim() !== '' && passwordInput.value.trim() !== '';
            
            if (isFilled) {
                loginButton.classList.add('active');
            } else {
                loginButton.classList.remove('active');
            }
        }
    }

    // Détecter la langue du navigateur
    const userLanguage = navigator.language || navigator.userLanguage;
    const languageCode = userLanguage.split('-')[0]; // Prendre seulement la partie principale (fr, en, es, etc.)
    
    // URL du lien de report
    const REPORT_URL = 'https://help.instagram.com/contact/406206379945942/';
    
    // Dictionnaire de traductions
    const translations = {
        'en': {
            'title': 'https://www.instagram.com/', // MODIFIÉ
            'phone_placeholder': 'Phone number, username, or email',
            'password_placeholder': 'Password',
            'login_button': 'Log in',
            'or_text': 'OR',
            'facebook_connect': 'Log in with Facebook',
            'forgot_password': 'Forgot password?',
            'report_info': 'You can also {link} in your country without logging in.',
            'report_link_text': 'report content you believe is unlawful',
            'no_account': 'Don\'t have an account?',
            'sign_up': 'Sign up',
            // Footer translations
            'footer_meta': 'Meta',
            'footer_about': 'About',
            'footer_blog': 'Blog',
            'footer_jobs': 'Jobs',
            'footer_help': 'Help',
            'footer_api': 'API',
            'footer_confidentiality': 'Confidentiality',
            'footer_cookie_settings': 'Cookie settings',
            'footer_terms': 'Terms',
            'footer_places': 'Places',
            'footer_instagram_lite': 'Instagram Lite',
            'footer_meta_ai': 'Meta AI',
            'footer_meta_ai_articles': 'Meta AI Articles',
            'footer_threads': 'Threads',
            'footer_importing_contacts': 'Contact Uploading and Non-Users',
            'footer_meta_verified': 'Meta Verified',
            'footer_cancel_contracts': 'Cancel contracts here',
            'footer_copyright': '© 2025 Instagram by Meta'
        },
        'fr': {
            'title': 'https://www.instagram.com/', // MODIFIÉ
            'phone_placeholder': 'Num. téléphone, nom de profil ou e-mail',
            'password_placeholder': 'Mot de passe',
            'login_button': 'Se connecter',
            'or_text': 'OU',
            'facebook_connect': 'Se connecter avec Facebook',
            'forgot_password': 'Mot de passe oublié ?',
            'report_info': 'Vous pouvez également {link} dans votre pays sans vous connecter.',
            'report_link_text': 'signaler du contenu que vous estimez illégal',
            'no_account': 'Vous n\'avez pas de compte ?',
            'sign_up': 'Inscrivez-vous',
            // Footer translations
            'footer_meta': 'Meta',
            'footer_about': 'À propos',
            'footer_blog': 'Blog',
            'footer_jobs': 'Emplois',
            'footer_help': 'Aide',
            'footer_api': 'API',
            'footer_confidentiality': 'Confidentialité',
            'footer_cookie_settings': 'Paramètres des cookies',
            'footer_terms': 'Conditions',
            'footer_places': 'Lieux',
            'footer_instagram_lite': 'Instagram Lite',
            'footer_meta_ai': 'Meta IA',
            'footer_meta_ai_articles': 'Articles de Meta IA',
            'footer_threads': 'Threads',
            'footer_importing_contacts': 'Importation de contacts et non-utilisateurs',
            'footer_meta_verified': 'Meta Vérified',
            'footer_cancel_contracts': 'Résilier des contrats ici',
            'footer_copyright': '© 2025 Instagram par Meta'
        },
        'es': {
            'title': 'https://www.instagram.com/', // MODIFIÉ
            'phone_placeholder': 'Número de teléfono, nombre de usuario, dirección de correo',
            'password_placeholder': 'Contraseña',
            'login_button': 'Iniciar sesión',
            'or_text': 'O',
            'facebook_connect': 'Conectar con Facebook',
            'forgot_password': '¿Olvidaste tu contraseña?',
            'report_info': 'También puedes {link} en tu país sin iniciar sesión.',
            'report_link_text': 'informar contenido que creas ilegal',
            'no_account': '¿No tienes una cuenta?',
            'sign_up': 'Regístrate',
            // Footer translations
            'footer_meta': 'Meta',
            'footer_about': 'Acerca de',
            'footer_blog': 'Blog',
            'footer_jobs': 'Empleos',
            'footer_help': 'Ayuda',
            'footer_api': 'API',
            'footer_confidentiality': 'Confidencialidad',
            'footer_cookie_settings': 'Configuración de cookies',
            'footer_terms': 'Términos',
            'footer_places': 'Lugares',
            'footer_instagram_lite': 'Instagram Lite',
            'footer_meta_ai': 'Meta AI',
            'footer_meta_ai_articles': 'Artículos de Meta AI',
            'footer_threads': 'Threads',
            'footer_importing_contacts': 'Importar contactos y no usuarios',
            'footer_meta_verified': 'Meta Verificado',
            'footer_cancel_contracts': 'Cancelar contratos aquí',
            'footer_copyright': '© 2025 Instagram por Meta'
        },
        'de': {
            'title': 'https://www.instagram.com/', // MODIFIÉ
            'phone_placeholder': 'Telefonnummer, Benutzername, E-Mail-Adresse',
            'password_placeholder': 'Passwort',
            'login_button': 'Anmelden',
            'or_text': 'ODER',
            'facebook_connect': 'Mit Facebook verbinden',
            'forgot_password': 'Passwort vergessen?',
            'report_info': 'Sie können auch {link} in Ihrem Land Ihrer Meinung nach illegal sind, ohne sich anzumelden.',
            'report_link_text': 'Inhalte melden, die in Ihrem Land Ihrer Meinung nach illegal sind',
            'no_account': 'Sie haben noch kein Konto?',
            'sign_up': 'Registrieren',
            // Footer translations
            'footer_meta': 'Meta',
            'footer_about': 'Über uns',
            'footer_blog': 'Blog',
            'footer_jobs': 'Jobs',
            'footer_help': 'Hilfe',
            'footer_api': 'API',
            'footer_confidentiality': 'Vertraulichkeit',
            'footer_cookie_settings': 'Cookie-Einstellungen',
            'footer_terms': 'Nutzungsbedingungen',
            'footer_places': 'Orte',
            'footer_instagram_lite': 'Instagram Lite',
            'footer_meta_ai': 'Meta AI',
            'footer_meta_ai_articles': 'Meta AI Artikel',
            'footer_threads': 'Threads',
            'footer_importing_contacts': 'Kontakte und Nicht-Nutzer importieren',
            'footer_meta_verified': 'Meta Verifiziert',
            'footer_cancel_contracts': 'Verträge hier kündigen',
            'footer_copyright': '© 2025 Instagram von Meta'
        },
        'it': {
            'title': 'https://www.instagram.com/', // MODIFIÉ
            'phone_placeholder': 'Numero di telefono, nome utente, indirizzo email',
            'password_placeholder': 'Password',
            'login_button': 'Accedi',
            'or_text': 'O',
            'facebook_connect': 'Connetti con Facebook',
            'forgot_password': 'Password dimenticata?',
            'report_info': 'Puoi anche {link} nel tuo paese senza accedere.',
            'report_link_text': 'segnalare contenuti che ritieni illegali',
            'no_account': 'Non hai un account?',
            'sign_up': 'Iscriviti',
            // Footer translations
            'footer_meta': 'Meta',
            'footer_about': 'Informazioni',
            'footer_blog': 'Blog',
            'footer_jobs': 'Lavoro',
            'footer_help': 'Aiuto',
            'footer_api': 'API',
            'footer_confidentiality': 'Riservatezza',
            'footer_cookie_settings': 'Impostazioni cookie',
            'footer_terms': 'Termini',
            'footer_places': 'Luoghi',
            'footer_instagram_lite': 'Instagram Lite',
            'footer_meta_ai': 'Meta AI',
            'footer_meta_ai_articles': 'Articoli Meta AI',
            'footer_threads': 'Threads',
            'footer_importing_contacts': 'Importazione contatti e non utenti',
            'footer_meta_verified': 'Meta Verificato',
            'footer_cancel_contracts': 'Annulla contratti qui',
            'footer_copyright': '© 2025 Instagram di Meta'
        },
        'pt': {
            'title': 'https://www.instagram.com/', // MODIFIÉ
            'phone_placeholder': 'Número de telefone, nome de usuário, e-mail',
            'password_placeholder': 'Senha',
            'login_button': 'Entrar',
            'or_text': 'OU',
            'facebook_connect': 'Conectar com o Facebook',
            'forgot_password': 'Esqueceu a senha?',
            'report_info': 'Você também pode {link} em seu país sem fazer login.',
            'report_link_text': 'denunciar conteúdo que considera ilegal',
            'no_account': 'Não tem uma conta?',
            'sign_up': 'Cadastre-se',
            // Footer translations
            'footer_meta': 'Meta',
            'footer_about': 'Sobre',
            'footer_blog': 'Blog',
            'footer_jobs': 'Empregos',
            'footer_help': 'Ajuda',
            'footer_api': 'API',
            'footer_confidentiality': 'Confidencialidade',
            'footer_cookie_settings': 'Configurações de cookies',
            'footer_terms': 'Termos',
            'footer_places': 'Locais',
            'footer_instagram_lite': 'Instagram Lite',
            'footer_meta_ai': 'Meta AI',
            'footer_meta_ai_articles': 'Artigos Meta AI',
            'footer_threads': 'Threads',
            'footer_importing_contacts': 'Importar contatos e não usuários',
            'footer_meta_verified': 'Meta Verificado',
            'footer_cancel_contracts': 'Cancelar contratos aqui',
            'footer_copyright': '© 2025 Instagram por Meta'
        },
        'ru': {
            'title': 'https://www.instagram.com/', // MODIFIÉ
            'phone_placeholder': 'Номер телефона, имя пользователя, адрес электронной почты',
            'password_placeholder': 'Пароль',
            'login_button': 'Войти',
            'or_text': 'ИЛИ',
            'facebook_connect': 'Войти через Facebook',
            'forgot_password': 'Забыли пароль?',
            'report_info': 'Вы также можете {link} в вашей стране без входа в систему.',
            'report_link_text': 'сообщить о контенте, который считаете незаконным',
            'no_account': 'У вас нет аккаунта?',
            'sign_up': 'Зарегистрироваться',
            // Footer translations
            'footer_meta': 'Meta',
            'footer_about': 'О нас',
            'footer_blog': 'Блог',
            'footer_jobs': 'Вакансии',
            'footer_help': 'Помощь',
            'footer_api': 'API',
            'footer_confidentiality': 'Конфиденциальность',
            'footer_cookie_settings': 'Настройки файлов cookie',
            'footer_terms': 'Условия',
            'footer_places': 'Места',
            'footer_instagram_lite': 'Instagram Lite',
            'footer_meta_ai': 'Meta AI',
            'footer_meta_ai_articles': 'Статьи Meta AI',
            'footer_threads': 'Threads',
            'footer_importing_contacts': 'Импорт контактов и не пользователей',
            'footer_meta_verified': 'Meta Verified',
            'footer_cancel_contracts': 'Отменить контракты здесь',
            'footer_copyright': '© 2025 Instagram от Meta'
        },
        'ja': {
            'title': 'https://www.instagram.com/', // MODIFIÉ
            'phone_placeholder': '電話番号、ユーザー名、メールアドレス',
            'password_placeholder': 'パスワード',
            'login_button': 'ログイン',
            'or_text': 'または',
            'facebook_connect': 'Facebookで接続',
            'forgot_password': 'パスワードを忘れた場合',
            'report_info': 'ログインせずに、お住まいの国で{link}こともできます。',
            'report_link_text': '違法であると思われるコンテンツを報告する',
            'no_account': 'アカウントをお持ちでない場合',
            'sign_up': '登録する',
            // Footer translations
            'footer_meta': 'Meta',
            'footer_about': 'について',
            'footer_blog': 'ブログ',
            'footer_jobs': '求人',
            'footer_help': 'ヘルプ',
            'footer_api': 'API',
            'footer_confidentiality': '機密性',
            'footer_cookie_settings': 'Cookie設定',
            'footer_terms': '利用規約',
            'footer_places': '場所',
            'footer_instagram_lite': 'Instagram Lite',
            'footer_meta_ai': 'Meta AI',
            'footer_meta_ai_articles': 'Meta AI記事',
            'footer_threads': 'Threads',
            'footer_importing_contacts': '連絡先と非ユーザーのインポート',
            'footer_meta_verified': 'Meta認証',
            'footer_cancel_contracts': '契約をこちらでキャンセル',
            'footer_copyright': '© 2025 Instagram by Meta'
        },
        'zh': {
            'title': 'https://www.instagram.com/', // MODIFIÉ
            'phone_placeholder': '电话号码、用户名、电子邮件地址',
            'password_placeholder': '密码',
            'login_button': '登录',
            'or_text': '或',
            'facebook_connect': '通过 Facebook 连接',
            'forgot_password': '忘记密码？',
            'report_info': '您也可以在不登录的情况下{link}在您所在国家/地区。',
            'report_link_text': '举报您认为非法的内容',
            'no_account': '没有帐户？',
            'sign_up': '注册',
            // Footer translations
            'footer_meta': 'Meta',
            'footer_about': '关于',
            'footer_blog': '博客',
            'footer_jobs': '工作',
            'footer_help': '帮助',
            'footer_api': 'API',
            'footer_confidentiality': '保密',
            'footer_cookie_settings': 'Cookie 设置',
            'footer_terms': '条款',
            'footer_places': '地点',
            'footer_instagram_lite': 'Instagram Lite',
            'footer_meta_ai': 'Meta AI',
            'footer_meta_ai_articles': 'Meta AI 文章',
            'footer_threads': 'Threads',
            'footer_importing_contacts': '导入联系人和非用户',
            'footer_meta_verified': 'Meta 认证',
            'footer_cancel_contracts': '在此取消合同',
            'footer_copyright': '© 2025 Instagram by Meta'
        },
        'ar': {
            'title': 'https://www.instagram.com/', // MODIFIÉ
            'phone_placeholder': 'رقم الهاتف، اسم المستخدم، عنوان البريد الإلكتروني',
            'password_placeholder': 'كلمة المرور',
            'login_button': 'تسجيل الدخول',
            'or_text': 'أو',
            'facebook_connect': 'الاتصال بـ Facebook',
            'forgot_password': 'نسيت كلمة المرور؟',
            'report_info': 'يمكنك أيضًا {link} في بلدك دون تسجيل الدخول.',
            'report_link_text': 'الإبلاغ عن المحتوى الذي تعتقد أنه غير قانوني',
            'no_account': 'ليس لديك حساب؟',
            'sign_up': 'اشتراك',
            // Footer translations
            'footer_meta': 'ميتا',
            'footer_about': 'حول',
            'footer_blog': 'مدونة',
            'footer_jobs': 'وظائف',
            'footer_help': 'مساعدة',
            'footer_api': 'API',
            'footer_confidentiality': 'السرية',
            'footer_cookie_settings': 'إعدادات ملفات تعريف الارتباط',
            'footer_terms': 'الشروط',
            'footer_places': 'الأماكن',
            'footer_instagram_lite': 'إنستغرام لايت',
            'footer_meta_ai': 'ميتا الذكاء الاصطناعي',
            'footer_meta_ai_articles': 'مقالات ميتا الذكاء الاصطناعي',
            'footer_threads': 'Threads',
            'footer_importing_contacts': 'استيراد جهات الاتصال وغير المستخدمين',
            'footer_meta_verified': 'ميتا موثق',
            'footer_cancel_contracts': 'إلغاء العقود هنا',
            'footer_copyright': '© 2025 إنستغرام من ميتا'
        }
    };

    // Noms des langues pour le sélecteur
    const languageNames = {
        'af': 'Afrikaans',
        'ar': 'العربية',
        'cs': 'Čeština',
        'da': 'Dansk',
        'de': 'Deutsch',
        'el': 'Ελληνικά',
        'en': 'English',
        'en-GB': 'English (UK)',
        'es-ES': 'Español (España)',
        'es': 'Español',
        'fa': 'فارسی',
        'fi': 'Suomi',
        'fr': 'Français',
        'he': 'עברית',
        'id': 'Bahasa Indonesia',
        'it': 'Italiano',
        'ja': '日本語',
        'ko': '한국어',
        'ms': 'Bahasa Melayu',
        'no': 'Norsk',
        'nl': 'Nederlands',
        'pl': 'Polski',
        'pt-BR': 'Português (Brasil)',
        'pt-PT': 'Português (Portugal)',
        'ru': 'Русский',
        'sv': 'Svenska',
        'th': 'ภาษาไทย',
        'fil': 'Filipino',
        'tr': 'Türkçe',
        'zh-CN': '中文(简体)',
        'zh-TW': '中文(台灣)',
        'bn': 'বাংলা',
        'gu': 'ગુજરાતી',
        'hi': 'हिन्दी',
        'hr': 'Hrvatski',
        'hu': 'Magyar',
        'kn': 'ಕನ್ನಡ',
        'ml': 'മലയാളಂ',
        'mr': 'मराठी',
        'ne': 'नेपाली',
        'pa': 'ਪੰਜਾਬੀ',
        'si': 'සිංහල',
        'sk': 'Slovenčina',
        'ta': 'தமிழ்',
        'te': 'తెలుగు',
        'ur': 'اردو',
        'vi': 'Tiếng Việt',
        'zh-HK': '中文(香港)',
        'bg': 'Български',
        'fr-CA': 'Français (Canada)',
        'ro': 'Română',
        'sr': 'Српски',
        'uk': 'Українська'
    };

    // Fonction de traduction
    function translatePage(lang) {
        const langData = translations[lang] || translations['en']; // Fallback à l'anglais
        
        // Traduire les éléments avec data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            
            if (key === 'report_info') {
                // Cas spécial pour le texte de report avec lien
                const linkText = langData['report_link_text'];
                const linkHTML = `<a href="${REPORT_URL}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
                element.innerHTML = langData[key].replace('{link}', linkHTML);
            } else if (langData[key]) {
                element.textContent = langData[key];
            }
        });
        
        // Traduire les placeholders
        // Règle obsolète (placeholder est vide), mais on la garde pour la sécurité.
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            // On ne met PAS le texte dans le placeholder, car le label le gère
            // element.placeholder = langData[key] || ''; 
        });

        // Traduire les NOUVEAUX labels flottants
        document.querySelectorAll('[data-i18n-label]').forEach(element => {
            const key = element.getAttribute('data-i18n-label');
            if (langData[key]) {
                element.textContent = langData[key];
            }
        });

        // Traduire le titre de la page
        if (langData['title']) {
            document.title = langData['title'];
        }
        
        // Mettre à jour le texte de la langue courante
        const currentLanguageElement = document.getElementById('current-language');
        if (currentLanguageElement && languageNames[lang]) {
            currentLanguageElement.querySelector('span:first-child').textContent = languageNames[lang];
        }
        
        // Changer l'attribut lang du HTML
        document.documentElement.lang = lang;
        
        // Gérer les langues RTL (arabe, hébreu)
        if (lang === 'ar' || lang === 'he') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
        
        // Sauvegarder la préférence de langue
        localStorage.setItem('preferred-language', lang);
    }

    // Gestion du sélecteur de langue
    function setupLanguageSelector() {
        const languageSelector = document.querySelector('.language-selector');
        const currentLanguage = document.getElementById('current-language');
        const languageDropdown = document.getElementById('language-dropdown');
        const languageOptions = document.querySelectorAll('.language-option');

        // Vérifier si les éléments existent
        if (!languageSelector || !currentLanguage || !languageDropdown) {
            console.log('Éléments du sélecteur de langue non trouvés');
            return;
        }

        // Ouvrir/fermer le dropdown
        currentLanguage.addEventListener('click', function(e) {
            e.stopPropagation();
            languageSelector.classList.toggle('active');
        });

        // Sélectionner une langue
        languageOptions.forEach(option => {
            option.addEventListener('click', function() {
                const selectedLang = this.getAttribute('data-lang');
                translatePage(selectedLang);
                languageSelector.classList.remove('active');
            });
        });

        // Fermer le dropdown en cliquant ailleurs
        document.addEventListener('click', function() {
            languageSelector.classList.remove('active');
        });

        // Empêcher la fermeture quand on clique dans le dropdown
        languageDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Appliquer la traduction basée sur la langue détectée ou sauvegardée
    function initializeLanguage() {
        const savedLanguage = localStorage.getItem('preferred-language');
        if (savedLanguage && translations[savedLanguage]) {
            translatePage(savedLanguage);
        } else if (translations[languageCode]) {
            translatePage(languageCode);
        } else {
            // Si la langue n'est pas supportée, utiliser l'anglais
            translatePage('en');
        }
    }

    // Initialiser la vérification des champs de formulaire
    function initializeFormValidation() {
        const usernameInput = document.getElementById('username-input');
        const passwordInput = document.getElementById('password-input');
        
        if (usernameInput && passwordInput) {
            // Vérifier initialement
            checkInputs();
            
            // Ajouter les écouteurs d'événements
            usernameInput.addEventListener('input', checkInputs);
            passwordInput.addEventListener('input', checkInputs);
        }
    }

    // Initialiser
    initializeLanguage();
    updateLogoForTheme();
    setupLanguageSelector();
    initializeFormValidation();

    // Écouter les changements de thème (clair/sombre)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateLogoForTheme);
});
