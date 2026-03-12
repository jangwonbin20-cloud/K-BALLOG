document.addEventListener('DOMContentLoaded', () => {

    // Language translation functionality
    const translations = {
        en: {
            pageTitle: "K-BALLOG - All About Amateur Football",
            yourLocation: "Your Location",
            seoul: "Seoul",
            suwon: "Suwon",
            incheon: "Incheon",
            yongin: "Yongin",
            navHome: "Home",
            navMatches: "Matches",
            navSearch: "Search",
            navNews: "News",
            navCommunity: "Community",
            yourLocationMobile: "Your Location:",
            heroTitle: "Local football news, check it all out at K-BALLOG!",
            heroSubtitle: "League rankings, match results, and latest news at a glance. Support your team and join K-BALLOG.",
            regionalLeagues: "Regional League Shortcuts",
            seoulLeague: "Seoul Amateur League",
            seoulLeagueDesc: "Check the latest information on K5, K6, K7, and SSSL leagues in the Seoul area.",
            suwonLeague: "Suwon Amateur League",
            suwonLeagueDesc: "Discover news from weekend leagues and clubs in Suwon.",
            incheonLeague: "Incheon Amateur League",
            incheonLeagueDesc: "Check various amateur league information and match results in the Incheon area.",
            yonginLeague: "Yongin Amateur League",
            yonginLeagueDesc: "Get the latest news from football clubs and leagues in Yongin.",
            footerAbout: "About Us",
            footerTerms: "Terms of Use",
            footerPrivacy: "Privacy Policy",
            footerContact: "Contact Us",
            footerRights: "© 2024 K-BALLOG. All rights reserved."
        },
        de: {
            pageTitle: "K-BALLOG - Alles über Amateurfußball",
            yourLocation: "Ihr Standort",
            seoul: "Seoul",
            suwon: "Suwon",
            incheon: "Incheon",
            yongin: "Yongin",
            navHome: "Startseite",
            navMatches: "Spiele",
            navSearch: "Suchen",
            navNews: "Nachrichten",
            navCommunity: "Gemeinschaft",
            yourLocationMobile: "Ihr Standort:",
            heroTitle: "Lokale Fußballnachrichten, alles bei K-BALLOG!",
            heroSubtitle: "Liga-Ranglisten, Spielergebnisse und aktuelle Nachrichten auf einen Blick. Unterstützen Sie Ihr Team und treten Sie K-BALLOG bei.",
            regionalLeagues: "Regionale Liga-Verknüpfungen",
            seoulLeague: "Amateurliga Seoul",
            seoulLeagueDesc: "Überprüfen Sie die neuesten Informationen zu den Ligen K5, K6, K7 und SSSL im Raum Seoul.",
            suwonLeague: "Amateurliga Suwon",
            suwonLeagueDesc: "Entdecken Sie Neuigkeiten von den Wochenendligen und Vereinen in Suwon.",
            incheonLeague: "Amateurliga Incheon",
            incheonLeagueDesc: "Überprüfen Sie verschiedene Informationen zu Amateurligen und Spielergebnissen im Raum Incheon.",
            yonginLeague: "Amateurliga Yongin",
            yonginLeagueDesc: "Erhalten Sie die neuesten Nachrichten von Fußballvereinen und Ligen in Yongin.",
            footerAbout: "Über uns",
            footerTerms: "Nutzungsbedingungen",
            footerPrivacy: "Datenschutz-Bestimmungen",
            footerContact: "Kontaktiere uns",
            footerRights: "© 2024 K-BALLOG. Alle Rechte vorbehalten."
        },
        es: {
            pageTitle: "K-BALLOG - Todo sobre el fútbol amateur",
            yourLocation: "Tu ubicación",
            seoul: "Seúl",
            suwon: "Suwon",
            incheon: "Incheon",
            yongin: "Yongin",
            navHome: "Inicio",
            navMatches: "Partidos",
            navSearch: "Buscar",
            navNews: "Noticias",
            navCommunity: "Comunidad",
            yourLocationMobile: "Tu ubicación:",
            heroTitle: "¡Noticias de fútbol local, consúltalas todas en K-BALLOG!",
            heroSubtitle: "Clasificaciones de la liga, resultados de los partidos y últimas noticias de un vistazo. Apoya a tu equipo y únete a K-BALLOG.",
            regionalLeagues: "Atajos de ligas regionales",
            seoulLeague: "Liga Amateur de Seúl",
            seoulLeagueDesc: "Consulta la información más reciente sobre las ligas K5, K6, K7 y SSSL en el área de Seúl.",
            suwonLeague: "Liga Amateur de Suwon",
            suwonLeagueDesc: "Descubre noticias de las ligas de fin de semana y clubes en Suwon.",
            incheonLeague: "Liga Amateur de Incheon",
            incheonLeagueDesc: "Consulta información variada sobre ligas amateur y resultados de partidos en el área de Incheon.",
            yonginLeague: "Liga Amateur de Yongin",
            yonginLeagueDesc: "Obtén las últimas noticias de los clubes y ligas de fútbol en Yongin.",
            footerAbout: "Sobre nosotros",
            footerTerms: "Términos de uso",
            footerPrivacy: "Política de privacidad",
            footerContact: "Contáctenos",
            footerRights: "© 2024 K-BALLOG. Todos los derechos reservados."
        },
        ja: {
            pageTitle: "K-BALLOG - アマチュアサッカーのすべて",
            yourLocation: "あなたの地域",
            seoul: "ソウル",
            suwon: "水原",
            incheon: "仁川",
            yongin: "龍仁",
            navHome: "ホーム",
            navMatches: "試合",
            navSearch: "検索",
            navNews: "ニュース",
            navCommunity: "コミュニティ",
            yourLocationMobile: "あなたの地域：",
            heroTitle: "地元のサッカーニュース、K-BALLOGですべてチェック！",
            heroSubtitle: "リーグランキング、試合結果、最新ニュースを一目で。あなたのチームを応援し、K-BALLOGに参加しましょう。",
            regionalLeagues: "地域リーグのショートカット",
            seoulLeague: "ソウルアマチュアリーグ",
            seoulLeagueDesc: "ソウル地域のK5、K6、K7、SSSLリーグの最新情報を確認してください。",
            suwonLeague: "水原アマチュアリーグ",
            suwonLeagueDesc: "水原の週末リーグとクラブからのニュースをご覧ください。",
            incheonLeague: "仁川アマチュアリーグ",
            incheonLeagueDesc: "仁川地域のさまざまなアマチュアリーグ情報と試合結果を確認してください。",
            yonginLeague: "龍仁アマチュアリーグ",
            yonginLeagueDesc: "龍仁のサッカークラブとリーグからの最新ニュースを入手してください。",
            footerAbout: "会社概要",
            footerTerms: "利用規約",
            footerPrivacy: "プライバシーポリシー",
            footerContact: "お問い合わせ",
            footerRights: "© 2024 K-BALLOG. 無断複写・転載を禁じます。"
        },
         ko: {
            pageTitle: "K-BALLOG - 아마추어 축구의 모든 것",
            yourLocation: "당신의 지역",
            seoul: "서울",
            suwon: "수원",
            incheon: "인천",
            yongin: "용인",
            navHome: "홈",
            navMatches: "경기",
            navSearch: "검색",
            navNews: "뉴스",
            navCommunity: "커뮤니티",
            yourLocationMobile: "당신의 지역:",
            heroTitle: "우리 동네 축구 소식, K-BALLOG에서 전부 확인하세요!",
            heroSubtitle: "지역별 리그 순위, 경기 결과, 최신 뉴스를 한눈에. 당신의 팀을 응원하고 K-BALLOG와 함께하세요.",
            regionalLeagues: "지역별 리그 바로가기",
            seoulLeague: "서울 아마추어 리그",
            seoulLeagueDesc: "서울 지역의 K5, K6, K7 및 SSSL 리그의 최신 정보를 확인하세요.",
            suwonLeague: "수원 아마추어 리그",
            suwonLeagueDesc: "수원시에서 진행되는 주말 리그와 클럽들의 소식을 만나보세요.",
            incheonLeague: "인천 아마추어 리그",
            incheonLeagueDesc: "인천 지역의 다양한 아마추어 리그 정보와 경기 결과를 확인하세요.",
            yonginLeague: "용인 아마추어 리그",
            yonginLeagueDesc: "용인시의 축구 클럽들과 리그의 최신 소식을 제공합니다.",
            footerAbout: "회사 소개",
            footerTerms: "이용 약관",
            footerPrivacy: "개인정보 처리방침",
            footerContact: "문의하기",
            footerRights: "© 2024 K-BALLOG. All rights reserved."
        }
    };

    const languageSelect = document.getElementById('language-select');

    function translatePage(language) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language] && translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });
        document.documentElement.lang = language; // Update the lang attribute of the html tag
    }

    if (languageSelect) {
        languageSelect.addEventListener('change', (event) => {
            translatePage(event.target.value);
        });
    }

    // Tab functionality
    const tabContainer = document.querySelector('.league-data-section');
    if (tabContainer) {
        const tabButtons = tabContainer.querySelectorAll('.tab-btn');
        const tabContents = tabContainer.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.dataset.tab;

                // Deactivate all buttons and content
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Activate the clicked button and corresponding content
                button.classList.add('active');
                document.getElementById(tabName).classList.add('active');
            });
        });
    }

    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.main-nav');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});
