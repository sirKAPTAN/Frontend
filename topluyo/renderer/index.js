
 // Clock functionality
    function updateClock() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      
      const clockElement = document.getElementById('clock');
      if (clockElement) {
        clockElement.textContent = timeString;
      }
    }

    // Update clock every second
    setInterval(updateClock, 1000);
    
    document.addEventListener('DOMContentLoaded', () => {
      // Initialize clock immediately
      updateClock();
      
      const users = ['Ali', 'Ayşe', 'Mehmet'];
      const dmList = document.getElementById('dmList');
      if (dmList) {
        dmList.innerHTML = users.map(u => `<li onclick=\"openDm('${u}')\">👤 ${u}</li>`).join('');
      }
      const messageBtn = document.getElementById('messageBtn');
      const miniBox = document.getElementById('miniMessageBox');
      if (messageBtn && miniBox) {
        messageBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          miniBox.style.display = miniBox.style.display === 'none' ? 'block' : 'none';
        });
        document.addEventListener('click', (e) => {
          if (!miniBox.contains(e.target) && e.target !== messageBtn) {
            miniBox.style.display = 'none';
          }
        });
      }
      
      // Mini friends button functionality
      const miniFriendsBtn = document.getElementById('miniFriendsBtn');
      if (miniFriendsBtn) {
        miniFriendsBtn.addEventListener('click', function() {
          // Set lastActiveFriendsButton to arkadaslarBtn in localStorage
          localStorage.setItem('lastActiveFriendsButton', 'arkadaslarBtn');
          
          // Show friends tab - this will automatically activate crew-btn and show centerPopup with friends content
          showTab('friends');
          
          // Hide minibox
          if (miniBox) miniBox.style.display = 'none';
        });
      }
            showMainPage();
      
      // localStorage'ı temizle ve mağaza sekmesini varsayılan yap
      localStorage.removeItem('lastActiveTab');
      
      // Mağaza sekmesini aç
      showTab('store');
      
      // Mağaza sekmesindeki varsayılan butonu seç
      const lastActiveStoreButton = localStorage.getItem('lastActiveStoreButton') || 'storeHomeBtn';
      selectStoreNav(lastActiveStoreButton);
    });
    function showTab(id) {
      // Aktif sekmeyi localStorage'a kaydet
      localStorage.setItem('lastActiveTab', id);
      
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.byteshop-btn, .virello-btn, .crew-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      const subSidebar = document.querySelector('.sub-sidebar');
      const subSidebarDivider = document.querySelector('.glow-vertical-divider.right');
      const homeTabs = ['store', 'discoverTab', 'friends'];
      // Tüm header ve içerik panellerini kapat
      [
        'store-header', 'discoverTab-header', 'friends-header',
        'store-content', 'discoverTab-content', 'friends-content'
      ].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });
      if (homeTabs.includes(id)) {
        if (subSidebar) subSidebar.style.display = 'flex';
        if (subSidebarDivider) subSidebarDivider.style.display = 'block';
        document.body.classList.add('main-page-active');
        const discoverTab = document.getElementById('discover');
        if (discoverTab) discoverTab.classList.add('active');
        // Ortak header ve içerik açma
        if (id === 'store') {
          document.getElementById('store-header').style.display = '';
          document.getElementById('store-content').style.display = 'flex';
          const byteshopBtn = document.querySelector('.byteshop-btn');
          if (byteshopBtn) byteshopBtn.classList.add('active');
          
          // Mağaza sekmesindeki son seçili butonu localStorage'dan al ve seç
          const lastActiveStoreButton = localStorage.getItem('lastActiveStoreButton');
          // Eğer localStorage'da kayıt yoksa varsayılan olarak Ana Sayfa seç
          const buttonToSelect = lastActiveStoreButton || 'storeHomeBtn';
          selectStoreNav(buttonToSelect);
        } else if (id === 'discoverTab') {
          document.getElementById('discoverTab-header').style.display = '';
          document.getElementById('discoverTab-content').style.display = 'flex';
          const virelloBtn = document.querySelector('.virello-btn');
          if (virelloBtn) virelloBtn.classList.add('active');
          
          // Keşfet sekmesindeki son seçili butonu localStorage'dan al ve seç
          const lastActiveDiscoverButton = localStorage.getItem('lastActiveDiscoverButton') || 'yayindaBtn';
          selectDiscoverNav(lastActiveDiscoverButton);
        } else if (id === 'friends') {
          document.getElementById('friends-header').style.display = '';
          document.getElementById('friends-content').style.display = 'flex';
          const crewBtn = document.querySelector('.crew-btn');
          if (crewBtn) crewBtn.classList.add('active');
          
          // Arkadaşlar sekmesindeki son seçili butonu localStorage'dan al ve seç
          const lastActiveFriendsButton = localStorage.getItem('lastActiveFriendsButton') || 'arkadaslarBtn';
          selectFriendsNav(lastActiveFriendsButton);
          
          // Arkadaşlar içeriğinin görünür olduğundan emin ol
          const friendsContent = document.getElementById('friends-content');
          if (friendsContent) {
            friendsContent.style.display = 'flex';
          }
        }
        // Center-header-popup her ana sekmede görünsün ve başlık güncellensin
        const centerPopup = document.getElementById('centerPopup');
        const centerPopupText = document.getElementById('centerPopupText');
        if (centerPopup) centerPopup.style.display = 'flex';
        if (centerPopupText) {
          // Önce arkadaşlar içeriğini gizle
          const centerPopupFriendsContent = document.getElementById('centerPopupFriendsContent');
          if (centerPopupFriendsContent) centerPopupFriendsContent.style.display = 'none';
          
          if (id === 'store') centerPopupText.textContent = '';
          else if (id === 'discoverTab') centerPopupText.textContent = '';
          else if (id === 'friends') {
            // Arkadaşlar sekmesi için centerPopup'ı arkadaşlar içeriğiyle göster
            centerPopupText.textContent = '';
            
            // Arkadaşlar içeriğini göster
            const takimBulPopup = document.getElementById('takimBulPopup');
            
            // Takım bul popup'ını gizle
            if (takimBulPopup) takimBulPopup.style.display = 'none';
            
            // Arkadaşlar içeriğini göster
            if (centerPopupFriendsContent) centerPopupFriendsContent.style.display = 'flex';
          }
        }
      } else {
        if (subSidebar) subSidebar.style.display = 'none';
        if (subSidebarDivider) subSidebarDivider.style.display = 'none';
        document.body.classList.remove('main-page-active');
        const tabToShow = document.getElementById(id);
        if (tabToShow) tabToShow.classList.add('active');
        const centerPopup = document.getElementById('centerPopup');
        if (centerPopup) centerPopup.style.display = 'none';
      }
      
      const windowControls = document.querySelector('.window-controls');
      if (windowControls) {
        if (['store', 'discoverTab', 'friends'].includes(id)) {
          windowControls.style.display = 'flex';
        } else {
          windowControls.style.display = 'none';
        }
      }
      
      const windowControlsBottomBox = document.querySelector('.window-controls-bottom-box');
      if (windowControlsBottomBox) {
        if (['store', 'discoverTab', 'friends'].includes(id)) {
          windowControlsBottomBox.style.display = 'flex';
        } else {
          windowControlsBottomBox.style.display = 'none';
        }
      }
      
      const rightDivider = document.querySelector('.glow-vertical-divider.right');
      if (rightDivider) {
        if (['store', 'discoverTab', 'friends'].includes(id)) {
          rightDivider.style.display = 'block';
        } else {
          rightDivider.style.display = 'none';
        }
      }
      
      const leftDivider = document.querySelector('.glow-vertical-divider:not(.right)');
      if (leftDivider) {
        if (['store', 'discoverTab', 'friends'].includes(id)) {
          leftDivider.style.display = 'block';
        } else {
          leftDivider.style.display = 'none';
        }
      }
    }

    function toggleYuzYuze() {
      // YüzYüze butonuna tıklanınca panel açılmasın veya içi boş kalsın
      const teamPanel = document.getElementById('team-search-panel');
      if (teamPanel) {
        teamPanel.style.display = 'block';
        teamPanel.innerHTML = '';
      }
      // Kutuları gizle
      document.querySelectorAll('.small-center-window-box, .center-window-box').forEach(el => el.style.display = 'none');
      // Katılımcı gridini gizle
      document.querySelectorAll('.participants-grid-container').forEach(el => el.style.display = 'none');
    }

    function toggleYarisma() {
      // Yarışma butonuna tıklanınca panel açılmasın veya içi boş kalsın
      const teamPanel = document.getElementById('team-search-panel');
      if (teamPanel) {
        teamPanel.style.display = 'block';
        teamPanel.innerHTML = '';
      }
      // Kutuları gizle
      document.querySelectorAll('.small-center-window-box, .center-window-box').forEach(el => el.style.display = 'none');
      // Katılımcı gridini gizle
      document.querySelectorAll('.participants-grid-container').forEach(el => el.style.display = 'none');
    }

    function toggleGameCategoryList() {
      const gameList = document.getElementById('game-category-list');
      const langList = document.getElementById('language-list');
      const categoryBtn = document.getElementById('categoryBtn');
      
      if (langList) langList.style.display = 'none';

      if (gameList) {
        const isDisplayed = gameList.style.display === 'block';
        gameList.style.display = isDisplayed ? 'none' : 'block';
        
        // Buton rengini güncelle
        if (categoryBtn) {
          if (gameList.style.display === 'block') {
            categoryBtn.classList.add('active-green');
            categoryBtn.classList.remove('active-yellow');
            // Takım Bul açıldıysa tüm kutuları tekrar göster
            document.querySelectorAll('.small-center-window-box, .center-window-box, .participants-grid-container').forEach(el => el.style.display = '');
          } else {
            categoryBtn.classList.remove('active-green');
          }
        }
      }
    }

    function toggleLanguageList() {
      const langList = document.getElementById('language-list');
      const gameList = document.getElementById('game-category-list');
      const langBtn = document.getElementById('langBtn');
      
      // Rank seçili değilse dil listesini açma
      const rankSelected = document.querySelector('#rank-list .select-btn.selected');
      if (!rankSelected) {
        return;
      }
      
      if (gameList) gameList.style.display = 'none';

      if (langList) {
        const isDisplayed = langList.style.display === 'block';
        langList.style.display = isDisplayed ? 'none' : 'block';
        
        // Buton rengini güncelle
        if (langBtn) {
          if (langList.style.display === 'block') {
            langBtn.classList.add('active-green');
            langBtn.classList.remove('active-yellow');
          } else {
            langBtn.classList.remove('active-green');
          }
        }
      }
    }

    function toggleInviteList() {
      const inviteList = document.getElementById('invite-list');
      const gameList = document.getElementById('game-category-list');
      const langList = document.getElementById('language-list');
      if (gameList) gameList.style.display = 'none';
      if (langList) langList.style.display = 'none';
      
      if (inviteList) {
        const isDisplayed = inviteList.style.display === 'block';
        inviteList.style.display = isDisplayed ? 'none' : 'block';
      }
    }

    function toggleRankList() {
      const rankList = document.getElementById('rank-list');
      const gameList = document.getElementById('game-category-list');
      const langList = document.getElementById('language-list');
      const rankBtn = document.getElementById('rankBtn');
      
      // Oyun seçili değilse rank listesini açma
      const gameSelected = document.querySelector('#game-category-list .select-btn.selected');
      if (!gameSelected) {
        return;
      }
      
      if (gameList) gameList.style.display = 'none';
      if (langList) langList.style.display = 'none';
      
      if (rankList) {
        const isDisplayed = rankList.style.display === 'block';
        rankList.style.display = isDisplayed ? 'none' : 'block';
        
        // Buton rengini güncelle
        if (rankBtn) {
          if (rankList.style.display === 'block') {
            rankBtn.classList.add('active-green');
            rankBtn.classList.remove('active-yellow');
          } else {
            rankBtn.classList.remove('active-green');
          }
        }
      }
    }

    // Dışarı tıklandığında listeleri kapat ve seçimleri sıfırla
    document.addEventListener('click', function(event) {
      const gameList = document.getElementById('game-category-list');
      const categoryBtn = document.getElementById('categoryBtn');
      const langList = document.getElementById('language-list');
      const langBtn = document.getElementById('langBtn');
      const rankList = document.getElementById('rank-list');
      const rankBtn = document.getElementById('rankBtn');
      const inviteList = document.getElementById('invite-list');
      const inviteBtn = document.getElementById('inviteBtn');
      
      // Boş alana tıklandığında tüm seçimleri sıfırla
      const isClickingOnSelectionArea = 
        (gameList && gameList.contains(event.target)) ||
        (categoryBtn && categoryBtn.contains(event.target)) ||
        (langList && langList.contains(event.target)) ||
        (langBtn && langBtn.contains(event.target)) ||
        (rankList && rankList.contains(event.target)) ||
        (rankBtn && rankBtn.contains(event.target)) ||
        (inviteList && inviteList.contains(event.target)) ||
        (inviteBtn && inviteBtn.contains(event.target));
      
      if (!isClickingOnSelectionArea) {
        // Tüm listeleri kapat
        if (gameList) gameList.style.display = 'none';
        if (langList) langList.style.display = 'none';
        if (rankList) rankList.style.display = 'none';
        if (inviteList) inviteList.style.display = 'none';
        
        // Tüm seçimleri sıfırla
        const allGameButtons = document.querySelectorAll('#game-category-list .select-btn');
        allGameButtons.forEach(btn => {
          btn.classList.remove('selected');
          btn.textContent = 'Seç';
        });
        
        const allLangButtons = document.querySelectorAll('#language-list .select-btn');
        allLangButtons.forEach(btn => {
          btn.classList.remove('selected');
          btn.textContent = 'Seç';
        });
        
        const allRankButtons = document.querySelectorAll('#rank-list .select-btn');
        allRankButtons.forEach(btn => {
          btn.classList.remove('selected');
          btn.textContent = 'Seç';
        });
        
        // Tüm buton renklerini sıfırla
        if (categoryBtn) {
          categoryBtn.classList.remove('active-yellow');
          categoryBtn.classList.remove('active-green');
        }
        if (langBtn) {
          langBtn.classList.remove('active-yellow');
          langBtn.classList.remove('active-green');
        }
        if (rankBtn) {
          rankBtn.classList.remove('active-yellow');
          rankBtn.classList.remove('active-green');
        }
        
        // Join butonunu da sıfırla
        const joinBtn = document.getElementById('joinRoomBtn');
        if (joinBtn) {
          joinBtn.classList.remove('active-yellow');
        }
        
        // Join button state'ini güncelle
        updateJoinButtonState();
      }
    });

    function filterGames() {
      const input = document.getElementById('game-search-input');
      const filter = input.value.toUpperCase();
      const list = document.getElementById('game-category-list');
      const items = list.getElementsByClassName('game-item');

      for (let i = 0; i < items.length; i++) {
        const gameName = items[i].getElementsByClassName('text')[0];
        if (gameName) {
          const txtValue = gameName.textContent || gameName.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = "flex";
          } else {
            items[i].style.display = "none";
          }
        }
      }
    }

    // CS2 Rankları
    const cs2Ranks = [
      'Silver I',
      'Silver II',
      'Silver III',
      'Silver IV',
      'Silver Elite',
      'Silver Elite Master',
      'Gold Nova I',
      'Gold Nova II',
      'Gold Nova III',
      'Gold Nova Master',
      'Master Guardian I',
      'Master Guardian II',
      'Master Guardian Elite',
      'Distinguished Master Guardian',
      'Legendary Eagle',
      'Legendary Eagle Master',
      'Supreme Master First Class',
      'Global Elite'
    ];

    // Rank sistemleri
    const valorantRanks = [
      'Demir 1', 'Demir 2', 'Demir 3',
      'Bronz 1', 'Bronz 2', 'Bronz 3',
      'Gümüş 1', 'Gümüş 2', 'Gümüş 3',
      'Altın 1', 'Altın 2', 'Altın 3',
      'Platin 1', 'Platin 2', 'Platin 3',
      'Elmas 1', 'Elmas 2', 'Elmas 3',
      'Ölümsüz 1', 'Ölümsüz 2', 'Ölümsüz 3',
      'Radyant'
    ];
    const lolRanks = [
      'Demir IV', 'Demir III', 'Demir II', 'Demir I',
      'Bronz IV', 'Bronz III', 'Bronz II', 'Bronz I',
      'Gümüş IV', 'Gümüş III', 'Gümüş II', 'Gümüş I',
      'Altın IV', 'Altın III', 'Altın II', 'Altın I',
      'Platin IV', 'Platin III', 'Platin II', 'Platin I',
      'Zümrüt IV', 'Zümrüt III', 'Zümrüt II', 'Zümrüt I',
      'Elmas IV', 'Elmas III', 'Elmas II', 'Elmas I',
      'Usta', 'Büyük Usta', 'Şampiyon'
    ];
    const dota2Ranks = [
      'Herald I', 'Herald II', 'Herald III', 'Herald IV', 'Herald V',
      'Guardian I', 'Guardian II', 'Guardian III', 'Guardian IV', 'Guardian V',
      'Crusader I', 'Crusader II', 'Crusader III', 'Crusader IV', 'Crusader V',
      'Archon I', 'Archon II', 'Archon III', 'Archon IV', 'Archon V',
      'Legend I', 'Legend II', 'Legend III', 'Legend IV', 'Legend V',
      'Ancient I', 'Ancient II', 'Ancient III', 'Ancient IV', 'Ancient V',
      'Divine I', 'Divine II', 'Divine III', 'Divine IV', 'Divine V',
      'Immortal'
    ];
    const rocketLeagueRanks = [
      'Bronze I', 'Bronze II', 'Bronze III',
      'Silver I', 'Silver II', 'Silver III',
      'Gold I', 'Gold II', 'Gold III',
      'Platinum I', 'Platinum II', 'Platinum III',
      'Diamond I', 'Diamond II', 'Diamond III',
      'Champion I', 'Champion II', 'Champion III',
      'Grand Champion I', 'Grand Champion II', 'Grand Champion III',
      'Supersonic Legend'
    ];
    const overwatchRanks = [
      'Bronz 5', 'Bronz 4', 'Bronz 3', 'Bronz 2', 'Bronz 1',
      'Gümüş 5', 'Gümüş 4', 'Gümüş 3', 'Gümüş 2', 'Gümüş 1',
      'Altın 5', 'Altın 4', 'Altın 3', 'Altın 2', 'Altın 1',
      'Platin 5', 'Platin 4', 'Platin 3', 'Platin 2', 'Platin 1',
      'Elmas 5', 'Elmas 4', 'Elmas 3', 'Elmas 2', 'Elmas 1',
      'Usta 5', 'Usta 4', 'Usta 3', 'Usta 2', 'Usta 1',
      'Büyük Usta 5', 'Büyük Usta 4', 'Büyük Usta 3', 'Büyük Usta 2', 'Büyük Usta 1',
      'En İyi 500'
    ];
    const brRanks = [
      'Bronz', 'Gümüş', 'Altın', 'Platin', 'Elmas', 'Usta', 'Şampiyon', 'Predator', 'Elite'
    ];

    function updateRankListForGame(gameName) {
      const rankList = document.getElementById('rank-list');
      const rankBtn = document.getElementById('rankBtn');
      if (!rankList || !rankBtn) return;
      let html = '<input type="text" id="rank-search-input" onkeyup="filterRanks()" placeholder="Rank ara..." class="search-input">';
      let ranks = [];
      if (gameName === 'Counter-Strike 2') {
        ranks = ['Rastgele', ...cs2Ranks];
      } else if (gameName === 'Valorant') {
        ranks = ['Rastgele', ...valorantRanks];
      } else if (gameName === 'League of Legends') {
        ranks = ['Rastgele', ...lolRanks];
      } else if (gameName === 'Dota 2') {
        ranks = ['Rastgele', ...dota2Ranks];
      } else if (gameName === 'Rocket League') {
        ranks = ['Rastgele', ...rocketLeagueRanks];
      } else if (gameName === 'Overwatch 2') {
        ranks = ['Rastgele', ...overwatchRanks];
      } else if ([
        'Apex Legends', 'PUBG: Battlegrounds', 'Call of Duty: Warzone', 'Fortnite', 'Call of Duty: Mobile', 'Free Fire', 'Arena Breakout', 'Naraka: Bladepoint'
      ].includes(gameName)) {
        ranks = ['Rastgele', ...brRanks];
      } else if (gameName) {
        ranks = ['Rastgele'];
      }
      ranks.forEach(rank => {
        html += `<div class=\"game-item\"><span class=\"game-name\">${rank}</span><button class=\"select-btn\" onclick=\"selectRank(this)\">Seç</button></div>`;
      });
      rankList.innerHTML = html;
      rankBtn.style.display = '';
      rankList.style.display = 'none';
    }

    // Oyun seçildiğinde rank butonunu ve listesini güncelle
    function selectGame(button) {
      // Eğer zaten seçiliyse, seçili durumu kaldır ve 'Seç' konumuna döndür
      if (button.classList.contains('selected')) {
        button.classList.remove('selected');
        button.textContent = 'Seç';
        // Kategori butonunun rengini de sıfırla
        const categoryBtn = document.getElementById('categoryBtn');
        if (categoryBtn) {
          categoryBtn.classList.remove('active-yellow');
          categoryBtn.classList.remove('active-green');
        }
        updateRankListForGame(null); // Oyun seçimi kaldırıldığında rank butonunu da gizle
        updateJoinButtonState();
        return;
      }
      // Find all select buttons in the game list
      const allButtons = document.querySelectorAll('#game-category-list .select-btn');
      // Reset all buttons
      allButtons.forEach(btn => {
          if (btn !== button) {
              btn.classList.remove('selected');
              btn.textContent = 'Seç';
          }
      });
      // Set the clicked button
      button.classList.add('selected');
      button.textContent = 'Seçildi';
      // Change category button color to yellow and remove green
      const categoryBtn = document.getElementById('categoryBtn');
      if (categoryBtn) {
          categoryBtn.classList.add('active-yellow');
          categoryBtn.classList.remove('active-green');
      }
      // Yeni: Oyun ismine göre rank listesini güncelle
      const gameName = button.parentElement.querySelector('.text')?.textContent;
      updateRankListForGame(gameName);
      updateJoinButtonState();
      
      // Otomatik olarak rank seçimini aç
      setTimeout(() => {
        toggleRankList();
      }, 100);
    }

    // Sayfa ilk açıldığında ve oyun seçimi değiştiğinde rank butonunu gizleme, her zaman göster
    document.addEventListener('DOMContentLoaded', () => {
      updateRankListForGame(null);
      const rankBtn = document.getElementById('rankBtn');
      if (rankBtn) rankBtn.style.display = '';
    });

    function filterLanguages() {
      const input = document.getElementById('lang-search-input');
      const filter = input.value.toUpperCase();
      const list = document.getElementById('language-list');
      const items = list.getElementsByClassName('game-item');

      for (let i = 0; i < items.length; i++) {
        const langName = items[i].getElementsByClassName('game-name')[0];
        if (langName) {
          const txtValue = langName.textContent || langName.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = "flex";
          } else {
            items[i].style.display = "none";
          }
        }
      }
    }

    function selectLanguage(button) {
      if (button.classList.contains('selected')) {
        button.classList.remove('selected');
        button.textContent = 'Seç';
        // Dil butonunun rengini de sıfırla
        const langBtn = document.getElementById('langBtn');
        if (langBtn) {
          langBtn.classList.remove('active-yellow');
          langBtn.classList.remove('active-green');
        }
        updateJoinButtonState();
        // Paneli kapat
        const teamPanel = document.getElementById('team-search-panel');
        if (teamPanel) {
          teamPanel.style.display = 'none';
          teamPanel.innerHTML = '';
        }
        // Odaya Katıl butonunu da sıfırla
        const joinBtn = document.getElementById('joinRoomBtn');
        if (joinBtn) joinBtn.classList.remove('active-yellow');
        // Dil panelini de kapat
        const langList = document.getElementById('language-list');
        if (langList) langList.style.display = 'none';
        return;
      }
        // Find all select buttons in the language list
        const allButtons = document.querySelectorAll('#language-list .select-btn');
        // Reset all buttons
        allButtons.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('selected');
                btn.textContent = 'Seç';
            }
        });
        // Set the clicked button
        button.classList.add('selected');
        button.textContent = 'Seçildi';
        // Change language button color to yellow and remove green
        const langBtn = document.getElementById('langBtn');
        if (langBtn) {
            langBtn.classList.add('active-yellow');
            langBtn.classList.remove('active-green');
      }
      updateJoinButtonState();
      // Her durumda: herhangi bir dil seçiliyse paneli aç, yoksa kapat
      const anySelected = document.querySelector('#language-list .select-btn.selected');
      const teamPanel = document.getElementById('team-search-panel');
      if (teamPanel) {
        if (anySelected) {
          teamPanel.innerHTML = '<button class="select-btn" style="width:100%;margin-top:8px;" onclick="teamSearchAction()">Takım Ara</button>';
          teamPanel.style.display = 'block';
          // KUTULARI BURADA ARTIK GÖSTERME!
        } else {
          teamPanel.style.display = 'none';
          teamPanel.innerHTML = '';
        }
      }
      // Herhangi bir dil seçiliyse odaya katıl butonunu sarı yap
      const joinBtn = document.getElementById('joinRoomBtn');
      if (joinBtn) {
        if (anySelected) {
          joinBtn.classList.add('active-yellow');
          joinBtn.classList.remove('active-blue');
          joinBtn.classList.remove('active-green');
        } else {
          joinBtn.classList.remove('active-yellow');
        }
      }
      // Dil panelini kapat
      const langList = document.getElementById('language-list');
      if (langList) langList.style.display = 'none';
    }

    function updateJoinButtonState() {
        const gameSelected = document.querySelector('#game-category-list .select-btn.selected');
        const langSelected = document.querySelector('#language-list .select-btn.selected');
        const rankSelected = document.querySelector('#rank-list .select-btn.selected');
        const roomInput = document.getElementById('roomInput');
        const joinButton = document.getElementById('joinRoomBtn');

        if (joinButton) {
            const isRoomNumberEntered = roomInput && roomInput.value.trim() !== '';
            const isGameLangRankSelected = gameSelected && langSelected && rankSelected;

            if (isGameLangRankSelected || isRoomNumberEntered) {
                joinButton.classList.add('active-yellow');
            } else {
                joinButton.classList.remove('active-yellow');
            }
        }
    }

    function showCrewImage() {
      const crewImage = document.getElementById('crewImageTop');
      if (crewImage) {
        crewImage.style.display = 'none';
      }
    }

    function filterRanks() {
      const input = document.getElementById('rank-search-input');
      const filter = input.value.toUpperCase();
      const list = document.getElementById('rank-list');
      const items = list.getElementsByClassName('game-item');
      for (let i = 0; i < items.length; i++) {
        const rankName = items[i].getElementsByClassName('game-name')[0];
        if (rankName) {
          const txtValue = rankName.textContent || rankName.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = "flex";
          } else {
            items[i].style.display = "none";
          }
        }
      }
    }

    function selectRank(button) {
      if (button.classList.contains('selected')) {
        button.classList.remove('selected');
        button.textContent = 'Seç';
        const rankBtn = document.getElementById('rankBtn');
        if (rankBtn) {
          rankBtn.classList.remove('active-yellow');
          rankBtn.classList.remove('active-green');
        }
        updateJoinButtonState();
        return;
      }
      const allButtons = document.querySelectorAll('#rank-list .select-btn');
      allButtons.forEach(btn => {
        if (btn !== button) {
          btn.classList.remove('selected');
          btn.textContent = 'Seç';
        }
      });
      button.classList.add('selected');
      button.textContent = 'Seçildi';
      const rankBtn = document.getElementById('rankBtn');
      if (rankBtn) {
        rankBtn.classList.add('active-yellow');
        rankBtn.classList.remove('active-green');
      }
      updateJoinButtonState();
      
      // Otomatik olarak dil seçimini aç
      setTimeout(() => {
        const langList = document.getElementById('language-list');
        const gameList = document.getElementById('game-category-list');
        const rankList = document.getElementById('rank-list');
        
        // Diğer listeleri kapat
        if (gameList) gameList.style.display = 'none';
        if (rankList) rankList.style.display = 'none';
        
        // Dil listesini aç
        if (langList) {
          langList.style.display = 'block';
        }
        
        // Dil butonunu yeşil yap
        const langBtn = document.getElementById('langBtn');
        if (langBtn) {
          langBtn.classList.add('active-green');
          langBtn.classList.remove('active-yellow');
        }
      }, 100);
    }

    function showMainPage() {
      // Ana sayfa göster, varsayılan olarak hiçbir sekme seçili değil
      // showTab('find') kaldırıldı - artık localStorage'dan sekme alınıyor
    }

    // Buton seçim fonksiyonları
    function selectButton(clickedButton, buttonGroup) {
      // Aynı gruptaki diğer butonlardan active/selected sınıfını kaldır
      const buttons = document.querySelectorAll(buttonGroup);
      buttons.forEach(btn => {
        btn.classList.remove('active', 'selected');
      });
      
      // Tıklanan butona active sınıfını ekle
      clickedButton.classList.add('active');
      
      // Katıl sekmesindeki butonlar için localStorage'a kaydet
      if (buttonGroup === '.chat-header.red .room-controls button') {
        localStorage.setItem('lastActiveKatilButton', clickedButton.textContent.trim());
      }
    }

    // Sayfa yüklendiğinde buton event listener'larını ekle
    document.addEventListener('DOMContentLoaded', () => {
      // Varsayılan buton seçimi kaldırıldı - artık localStorage'dan sekme alınıyor
      
      // Arkadaşlar butonları için
      const crewNavButtons = document.querySelectorAll('.crew-nav-btn');
      crewNavButtons.forEach(btn => {
        btn.addEventListener('click', function() {
          selectButton(this, '.crew-nav-btn');
        });
      });

      // Keşfet butonları için
      const discoverButtons = document.querySelectorAll('.discover-btn');
      discoverButtons.forEach(btn => {
        btn.addEventListener('click', function() {
          selectButton(this, '.discover-btn');
        });
      });

      // Mağaza butonları için
      const storeButtons = document.querySelectorAll('.byteshop-green-btn');
      storeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
          selectButton(this, '.byteshop-green-btn');
        });
      });

      // Katıl butonları için (YüzYüze, Yarışma, Takım Bul, vb.)
      const katilButtons = document.querySelectorAll('.chat-header.red .room-controls button');
      katilButtons.forEach(btn => {
        btn.addEventListener('click', function() {
          selectButton(this, '.chat-header.red .room-controls button');
        });
      });

      const arkadaslarBtn = document.getElementById('arkadaslarBtn');
      const cevrimiciBtn = document.getElementById('cevrimiciBtn');
      const tumuBtn = document.getElementById('tumuBtn');
      const arkadaslarPopup = document.getElementById('arkadaslarPopup');
      const cevrimiciPopup = document.getElementById('cevrimiciPopup');
      const tumuPopup = document.getElementById('tumuPopup');
      function hideAllPopups() {
        arkadaslarPopup.style.display = 'none';
        cevrimiciPopup.style.display = 'none';
        tumuPopup.style.display = 'none';
      }
      if (arkadaslarBtn && cevrimiciBtn && tumuBtn) {
        arkadaslarBtn.addEventListener('click', function() {
          hideAllPopups();
          arkadaslarPopup.style.display = 'flex';
          localStorage.setItem('lastActiveFriendsPopup', 'arkadaslarPopup');
          
          // CenterPopup'ta arkadaşlar içeriğini göster
          const centerPopup = document.getElementById('centerPopup');
          const centerPopupText = document.getElementById('centerPopupText');
          const centerPopupFriendsContent = document.getElementById('centerPopupFriendsContent');
          const takimBulPopup = document.getElementById('takimBulPopup');
          
          if (centerPopup) centerPopup.style.display = 'flex';
          if (centerPopupText) centerPopupText.textContent = '';
          if (takimBulPopup) takimBulPopup.style.display = 'none';
          if (centerPopupFriendsContent) centerPopupFriendsContent.style.display = 'flex';
        });
        cevrimiciBtn.addEventListener('click', function() {
          hideAllPopups();
          cevrimiciPopup.style.display = 'flex';
          localStorage.setItem('lastActiveFriendsPopup', 'cevrimiciPopup');
        });
        tumuBtn.addEventListener('click', function() {
          hideAllPopups();
          tumuPopup.style.display = 'flex';
          localStorage.setItem('lastActiveFriendsPopup', 'tumuPopup');
        });
      }
    });

    // Dinamik popup açma
    const centerPopup = document.getElementById('centerPopup');
    const centerPopupText = document.getElementById('centerPopupText');

    function showCenterPopup(text) {
      if (centerPopupText) centerPopupText.textContent = '';
      if (centerPopup) centerPopup.style.display = 'flex';
    }
    function hideCenterPopup() {
      if (centerPopup) centerPopup.style.display = 'none';
    }
    // Ana butonlar
    const mainPopupButtons = Array.from(document.querySelectorAll('.chat-header .room-controls button'));
    mainPopupButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        showCenterPopup(this.textContent.trim());
        e.stopPropagation();
      });
    });
    // Kapatma butonu ekle
    if (centerPopup) {
      // Kapat butonu eklenmeyecek, hiçbir şekilde kullanıcı tarafından kapatılamayacak
      // Sadece koddan hideCenterPopup() çağrılırsa kapanacak
    }
    // window.addEventListener('click', ...) ile popup'ı kapatan kod kaldırıldı.

    document.addEventListener('DOMContentLoaded', function() {
      var arkadaslarPopup = document.getElementById('arkadaslarPopup');
      if (arkadaslarPopup) {
        arkadaslarPopup.addEventListener('click', function(e) {
          e.stopPropagation();
        });
      }
      var cevrimiciPopup = document.getElementById('cevrimiciPopup');
      if (cevrimiciPopup) {
        cevrimiciPopup.addEventListener('click', function(e) {
          e.stopPropagation();
        });
      }
      var tumuPopup = document.getElementById('tumuPopup');
      if (tumuPopup) {
        tumuPopup.addEventListener('click', function(e) {
          e.stopPropagation();
        });
      }
      // Eğer başka popup'lar varsa buraya ekleyebilirsin
    });

    document.addEventListener('DOMContentLoaded', function() {
      // Soldaki Arkadaşlar butonuna tıklanınca sadece friends-header paneli açılsın
      var crewBtn = document.querySelector('.crew-btn');
      if (crewBtn) {
        crewBtn.addEventListener('click', function() {
          // Tüm header'ları kapat
          ["find-header", "store-header", "discoverTab-header", "friends-header"].forEach(function(h) {
            var el = document.getElementById(h);
            if (el) el.style.display = 'none';
          });
          // Sadece friends-header'ı aç
          var friendsHeader = document.getElementById('friends-header');
          if (friendsHeader) friendsHeader.style.display = '';
          // Üstteki Arkadaşlar butonunu seçili yap ve ilgili içeriği göster
          selectFriendsNav('arkadaslarBtn');
          // centerPopupText'i de temizle
          var centerPopupText = document.getElementById('centerPopupText');
          if (centerPopupText) centerPopupText.textContent = '';
          // centerPopup'ı da gizle
          var centerPopup = document.getElementById('centerPopup');
          if (centerPopup) centerPopup.style.display = 'none';
        });
      }
    });

    document.addEventListener('DOMContentLoaded', function() {
      // ... mevcut kodlar ...
      var arkadaslarBtn = document.getElementById('arkadaslarBtn');
      if (arkadaslarBtn) {
        arkadaslarBtn.addEventListener('click', function() {
          // Tüm discover-tab-content panellerini gizle
          document.querySelectorAll('.discover-tab-content').forEach(function(el) {
            el.style.display = 'none';
          });
          // Sadece friends-content panelini göster
          var friendsContent = document.getElementById('friends-content');
          if (friendsContent) friendsContent.style.display = 'flex';
        });
      }
    });

    document.addEventListener('DOMContentLoaded', function() {
      // ... mevcut kodlar ...
      var crewBtn = document.querySelector('.crew-btn');
      var arkadaslarBtn = document.getElementById('arkadaslarBtn');
      if (crewBtn && arkadaslarBtn) {
        crewBtn.addEventListener('click', function() {
          // Takım Bul popup'ını kapat
          const takimBulPopup = document.getElementById('takimBulPopup');
          if (takimBulPopup) takimBulPopup.style.display = 'none';
          
          // Tüm üst nav butonlarını pasif yap
          document.querySelectorAll('.crew-nav-btn').forEach(function(btn) {
            btn.classList.remove('active');
          });
          // Arkadaşlar butonunu aktif yap
          arkadaslarBtn.classList.add('active');
          // Tüm discover-tab-content panellerini gizle
          document.querySelectorAll('.discover-tab-content').forEach(function(el) {
            el.style.display = 'none';
          });
          // Sadece friends-content panelini göster
          var friendsContent = document.getElementById('friends-content');
          if (friendsContent) friendsContent.style.display = 'flex';
        });
      }
    });

    document.addEventListener('DOMContentLoaded', function() {
      // Soldaki ana butonlar ve üstteki header butonları eşleştir
      var btnMap = [
        { sidebar: '.byteshop-btn', header: 'store-header', nav: null, content: null },
        { sidebar: '.virello-btn', header: 'discoverTab-header', nav: null, content: null },
        { sidebar: '.crew-btn', header: 'friends-header', nav: 'arkadaslarBtn', content: 'friends-content' }
      ];
      btnMap.forEach(function(map) {
        var sidebarBtn = document.querySelector(map.sidebar);
        var header = map.header ? document.getElementById(map.header) : null;
        var navBtn = map.nav ? document.getElementById(map.nav) : null;
        var content = map.content ? document.getElementById(map.content) : null;
        if (sidebarBtn) {
          sidebarBtn.addEventListener('click', function() {
            // Takım Bul popup'ını kapat
            const takimBulPopup = document.getElementById('takimBulPopup');
            if (takimBulPopup) takimBulPopup.style.display = 'none';
            
            // Tüm header'ları kapat
            ["store-header", "discoverTab-header", "friends-header"].forEach(function(h) {
              var el = document.getElementById(h);
              if (el) el.style.display = 'none';
            });
            // İlgili header'ı aç
            if (header) header.style.display = '';
            // Tüm üst nav butonlarını pasif yap
            document.querySelectorAll('.crew-nav-btn').forEach(function(btn) {
              btn.classList.remove('active');
            });
            // İlgili nav butonunu aktif yap
            if (navBtn) navBtn.classList.add('active');
            // Tüm discover-tab-content panellerini gizle
            document.querySelectorAll('.discover-tab-content').forEach(function(el) {
              el.style.display = 'none';
            });
            // İlgili content panelini göster
            if (content) content.style.display = 'flex';
          });
        }
      });
    });

    // Store nav selection logic
    function selectStoreNav(selectedId) {
      document.querySelectorAll('.store-nav-btn').forEach(btn => btn.classList.remove('active'));
      const selectedBtn = document.getElementById(selectedId);
      if (selectedBtn) selectedBtn.classList.add('active');
      
      // Mağaza sekmesindeki seçimi localStorage'a kaydet
      localStorage.setItem('lastActiveStoreButton', selectedId);
      
      // Store content div'ini görünür yap
      const storeContent = document.getElementById('store-content');
      if (storeContent) storeContent.style.display = 'flex';
      
      // Show/hide content
      if (selectedId === 'storeHomeBtn') {
        document.getElementById('store-home-content').style.display = '';
        document.getElementById('store-platform-content').style.display = 'none';
      } else if (selectedId === 'platformBtn') {
        document.getElementById('store-home-content').style.display = 'none';
        document.getElementById('store-platform-content').style.display = '';
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      const storeHomeBtn = document.getElementById('storeHomeBtn');
      const platformBtn = document.getElementById('platformBtn');
      if (storeHomeBtn) {
        storeHomeBtn.addEventListener('click', function() {
          selectStoreNav('storeHomeBtn');
        });
      }
      if (platformBtn) {
        platformBtn.addEventListener('click', function() {
          selectStoreNav('platformBtn');
        });
      }
    });

    // Discover nav selection logic
    function selectDiscoverNav(selectedId) {
      document.querySelectorAll('.discover-nav-btn').forEach(btn => btn.classList.remove('active'));
      const selectedBtn = document.getElementById(selectedId);
      if (selectedBtn) selectedBtn.classList.add('active');
      
      // Keşfet sekmesindeki seçimi localStorage'a kaydet
      localStorage.setItem('lastActiveDiscoverButton', selectedId);
      
      // Discover content div'ini görünür yap
      const discoverContent = document.getElementById('discoverTab-content');
      if (discoverContent) discoverContent.style.display = 'flex';
      
      // Show/hide content
      document.getElementById('discover-oynat-content').style.display = 'none';
      document.getElementById('discover-yayinda-content').style.display = 'none';
      document.getElementById('discover-oyunsunucu-content').style.display = 'none';
      if (selectedId === 'oynatBtn') {
        document.getElementById('discover-oynat-content').style.display = '';
      } else if (selectedId === 'yayindaBtn') {
        document.getElementById('discover-yayinda-content').style.display = '';
      } else if (selectedId === 'oyunSunucuBtn') {
        document.getElementById('discover-oyunsunucu-content').style.display = '';
      }
    }
    document.addEventListener('DOMContentLoaded', function() {
      const oynatBtn = document.getElementById('oynatBtn');
      const yayindaBtn = document.getElementById('yayindaBtn');
      const oyunSunucuBtn = document.getElementById('oyunSunucuBtn');
      if (oynatBtn) {
        oynatBtn.addEventListener('click', function() {
          selectDiscoverNav('oynatBtn');
        });
      }
      if (yayindaBtn) {
        yayindaBtn.addEventListener('click', function() {
          selectDiscoverNav('yayindaBtn');
        });
      }
      if (oyunSunucuBtn) {
        oyunSunucuBtn.addEventListener('click', function() {
          selectDiscoverNav('oyunSunucuBtn');
        });
      }
    });
    // Friends nav selection logic
    function selectFriendsNav(selectedId) {
      document.querySelectorAll('.crew-nav-btn').forEach(btn => btn.classList.remove('active'));
      const selectedBtn = document.getElementById(selectedId);
      if (selectedBtn) selectedBtn.classList.add('active');
      
      // Arkadaşlar sekmesindeki seçimi localStorage'a kaydet
      localStorage.setItem('lastActiveFriendsButton', selectedId);
      
      // Arkadaşlar ana içeriğinin görünür olduğundan emin ol
      const friendsContent = document.getElementById('friends-content');
      if (friendsContent) {
        friendsContent.style.display = 'flex';
      }
      
      // Show/hide content
      document.getElementById('friends-arkadaslar-content').style.display = 'none';
      document.getElementById('friends-cevrimici-content').style.display = 'none';
      document.getElementById('friends-tumu-content').style.display = 'none';
      document.getElementById('friends-ekle-content').style.display = 'none';
      if (selectedId === 'arkadaslarBtn') {
        document.getElementById('friends-arkadaslar-content').style.display = 'flex';
        
        // CenterPopup'ta arkadaşlar içeriğini göster
        const centerPopup = document.getElementById('centerPopup');
        const centerPopupText = document.getElementById('centerPopupText');
        const centerPopupFriendsContent = document.getElementById('centerPopupFriendsContent');
        const takimBulPopup = document.getElementById('takimBulPopup');
        
        if (centerPopup) centerPopup.style.display = 'flex';
        if (centerPopupText) centerPopupText.textContent = '';
        if (takimBulPopup) takimBulPopup.style.display = 'none';
        if (centerPopupFriendsContent) centerPopupFriendsContent.style.display = 'flex';
      } else if (selectedId === 'cevrimiciBtn') {
        document.getElementById('friends-cevrimici-content').style.display = 'flex';
      } else if (selectedId === 'tumuBtn') {
        document.getElementById('friends-tumu-content').style.display = 'flex';
      } else if (selectedId === 'arkadasEkleBtn') {
        document.getElementById('friends-ekle-content').style.display = 'flex';
      }
      
      // Popup'ları localStorage'dan yükle
      const lastActiveFriendsPopup = localStorage.getItem('lastActiveFriendsPopup');
      if (lastActiveFriendsPopup) {
        const arkadaslarPopup = document.getElementById('arkadaslarPopup');
        const cevrimiciPopup = document.getElementById('cevrimiciPopup');
        const tumuPopup = document.getElementById('tumuPopup');
        
        // Önce tüm popup'ları gizle
        if (arkadaslarPopup) arkadaslarPopup.style.display = 'none';
        if (cevrimiciPopup) cevrimiciPopup.style.display = 'none';
        if (tumuPopup) tumuPopup.style.display = 'none';
        
        // Son seçili popup'ı göster
        if (lastActiveFriendsPopup === 'arkadaslarPopup' && arkadaslarPopup) {
          arkadaslarPopup.style.display = 'flex';
        } else if (lastActiveFriendsPopup === 'cevrimiciPopup' && cevrimiciPopup) {
          cevrimiciPopup.style.display = 'flex';
        } else if (lastActiveFriendsPopup === 'tumuPopup' && tumuPopup) {
          tumuPopup.style.display = 'flex';
        }
      }
    }
    document.addEventListener('DOMContentLoaded', function() {
      const arkadaslarBtn = document.getElementById('arkadaslarBtn');
      const cevrimiciBtn = document.getElementById('cevrimiciBtn');
      const tumuBtn = document.getElementById('tumuBtn');
      const arkadasEkleBtn = document.getElementById('arkadasEkleBtn');
      if (arkadaslarBtn) {
        arkadaslarBtn.addEventListener('click', function() {
          // Takım Bul popup'ını kapat
          const takimBulPopup = document.getElementById('takimBulPopup');
          if (takimBulPopup) takimBulPopup.style.display = 'none';
          
          selectFriendsNav('arkadaslarBtn');
        });
      }
      if (cevrimiciBtn) {
        cevrimiciBtn.addEventListener('click', function() {
          selectFriendsNav('cevrimiciBtn');
        });
      }
      if (tumuBtn) {
        tumuBtn.addEventListener('click', function() {
          selectFriendsNav('tumuBtn');
        });
      }
      if (arkadasEkleBtn) {
        arkadasEkleBtn.addEventListener('click', function() {
          selectFriendsNav('arkadasEkleBtn');
        });
      }
    });

    // Takım Bul butonuna tıklanınca sadece 400x400 popup göster
    const categoryBtn = document.getElementById('categoryBtn');
    const takimBulPopup = document.getElementById('takimBulPopup');
    if (categoryBtn && takimBulPopup) {
      categoryBtn.addEventListener('click', function() {
        takimBulPopup.style.display = 'flex';
        setTimeout(() => {
          showPopupGameList();
        }, 100);
      });
    }
    // Diğer sekmelerde veya butonlarda popup'ı gizle
    const yuzYuzeBtn = Array.from(document.querySelectorAll('.room-controls .red-btn')).find(btn => btn.textContent.trim() === 'YüzYüze');
    const yarismaBtn = Array.from(document.querySelectorAll('.room-controls .red-btn')).find(btn => btn.textContent.trim() === 'Yarışma');
    [yuzYuzeBtn, yarismaBtn].forEach(btn => {
      if (btn && takimBulPopup) {
        btn.addEventListener('click', function() {
          takimBulPopup.style.display = 'none';
        });
      }
    });

    // Popup içindeki fonksiyonlar
    function showPopupGameList() {
      hideAllPopupLists();
      const popupGameList = document.getElementById('popup-game-list');
      if (popupGameList) {
        popupGameList.style.display = 'flex';
        populatePopupGameList();
      }
    }

    function showPopupRankList() {
      hideAllPopupLists();
      const popupRankList = document.getElementById('popup-rank-list');
      if (popupRankList) {
        popupRankList.style.display = 'flex';
        populatePopupRankList();
      }
    }

    function showPopupLanguageList() {
      hideAllPopupLists();
      const popupLanguageList = document.getElementById('popup-language-list');
      if (popupLanguageList) {
        popupLanguageList.style.display = 'flex';
        populatePopupLanguageList();
      }
    }

    function showPopupTeamSearch() {
      hideAllPopupLists();
      const popupTeamSearch = document.getElementById('popup-team-search');
      if (popupTeamSearch) {
        popupTeamSearch.style.display = 'block';
      }
    }

    function hideAllPopupLists() {
      const lists = ['popup-game-list', 'popup-rank-list', 'popup-language-list', 'popup-team-search', 'popup-video-player'];
      lists.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.style.display = 'none';
      });
    }

    function populatePopupGameList() {
      const container = document.getElementById('popup-game-items');
      if (!container) return;

      const games = [
        { name: 'Valorant', icon: '◆?◆' },
        { name: 'Counter-Strike 2', icon: '🎮' },
        { name: 'Call of Duty: Warzone', icon: '🎮' },
        { name: 'Rainbow Six Siege', icon: '🎮' },
        { name: 'Apex Legends', icon: '🎮' },
        { name: 'PUBG: Battlegrounds', icon: '🎮' },
        { name: 'Overwatch 2', icon: '🎮' },
        { name: 'Fortnite', icon: '🎮' },
        { name: 'League of Legends', icon: '🎮' },
        { name: 'Dota 2', icon: '🎮' },
        { name: 'Rocket League', icon: '🎮' },
        { name: 'Battlefield 2042', icon: '🎮' },
        { name: 'FIFA 24', icon: '⚽' },
        { name: 'NBA 2K24', icon: '🏀' },
        { name: 'Mortal Kombat 1', icon: '🥊' },
        { name: 'Street Fighter 6', icon: '🥊' },
        { name: 'Tekken 8', icon: '🥊' },
        { name: 'Super Smash Bros', icon: '⚔️' },
        { name: 'Minecraft', icon: '⛏️' },
        { name: 'Roblox', icon: '🎮' },
        { name: 'Among Us', icon: '👥' },
        { name: 'Fall Guys', icon: '🏃' },
        { name: 'GTA Online', icon: '🚗' },
        { name: 'Red Dead Online', icon: '🐎' },
        { name: 'Cyberpunk 2077', icon: '🤖' },
        { name: 'The Witcher 3', icon: '⚔️' },
        { name: 'Elden Ring', icon: '🗡️' },
        { name: 'Dark Souls', icon: '💀' },
        { name: 'Bloodborne', icon: '🩸' },
        { name: 'Sekiro', icon: '🗡️' },
        { name: 'Demon Souls', icon: '💀' },
        { name: 'God of War', icon: '⚔️' },
        { name: 'Spider-Man', icon: '🕷️' },
        { name: 'Assassin\'s Creed', icon: '🗡️' },
        { name: 'Far Cry', icon: '🏹' },
        { name: 'Watch Dogs', icon: '💻' },
        { name: 'Resident Evil', icon: '🧟' },
        { name: 'Silent Hill', icon: '👻' },
        { name: 'Dead Space', icon: '🚀' },
        { name: 'Mass Effect', icon: '🚀' },
        { name: 'Dragon Age', icon: '🐉' },
        { name: 'The Elder Scrolls', icon: '🗡️' },
        { name: 'Fallout', icon: '☢️' },
        { name: 'Bioshock', icon: '🏛️' },
        { name: 'Borderlands', icon: '🔫' },
        { name: 'Destiny 2', icon: '🌌' },
        { name: 'Warframe', icon: '🤖' },
        { name: 'Path of Exile', icon: '⚔️' },
        { name: 'Diablo', icon: '👹' },
        { name: 'World of Warcraft', icon: '🐉' },
        { name: 'Final Fantasy XIV', icon: '⚔️' },
        { name: 'Black Desert Online', icon: '⚔️' },
        { name: 'Lost Ark', icon: '⚔️' },
        { name: 'New World', icon: '🗡️' },
        { name: 'EVE Online', icon: '🚀' },
        { name: 'Star Citizen', icon: '🚀' },
        { name: 'Elite Dangerous', icon: '🚀' },
        { name: 'No Man\'s Sky', icon: '🌌' },
        { name: 'Stellaris', icon: '🌌' },
        { name: 'Civilization', icon: '🏛️' },
        { name: 'Total War', icon: '⚔️' },
        { name: 'Age of Empires', icon: '🏰' },
        { name: 'Command & Conquer', icon: '⚔️' },
        { name: 'StarCraft', icon: '🚀' },
        { name: 'Warcraft', icon: '⚔️' },
        { name: 'Dota Underlords', icon: '⚔️' },
        { name: 'Teamfight Tactics', icon: '⚔️' },
        { name: 'Hearthstone', icon: '  ' },
        { name: 'Magic: The Gathering', icon: '🃏' },
        { name: 'Yu-Gi-Oh!', icon: '🃏' },
        { name: 'Pokemon', icon: '⚡' },
        { name: 'Monster Hunter', icon: '🐉' }
      ];

      container.innerHTML = games.map(game => `
        <div class="game-item" style="display: flex; justify-content: space-between; align-items: center; padding: 4px 8px; border-bottom: 1px solid #444; color: #fff; cursor: pointer;" onclick="selectPopupGame('${game.name}')">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span>${game.icon}</span>
            <span style="font-weight: bold;">${game.name}</span>
          </div>
        </div>
      `).join('');
    }

    function populatePopupRankList() {
      const container = document.getElementById('popup-rank-items');
      if (!container) return;

      const ranks = [
        'Rastgele', 'Silver I', 'Silver II', 'Silver III', 'Silver IV', 'Silver Elite', 'Silver Elite Master',
        'Gold Nova I', 'Gold Nova II', 'Gold Nova III', 'Gold Nova Master', 'Master Guardian I',
        'Master Guardian II', 'Master Guardian Elite', 'Distinguished Master Guardian', 'Legendary Eagle',
        'Legendary Eagle Master', 'Supreme Master First Class', 'Global Elite'
      ];

      container.innerHTML = ranks.map(rank => `
        <div class="rank-item" style="display: flex; align-items: center; padding: 4px 8px; border-bottom: 1px solid #444; color: #fff; cursor: pointer;" onclick="selectPopupRank('${rank}')">
          <span style="font-weight: bold;">${rank}</span>
        </div>
      `).join('');
      container.style.overflowY = 'auto';
    }

    function populatePopupLanguageList() {
      const container = document.getElementById('popup-lang-items');
      if (!container) return;

      const languages = [
        'İngilizce', 'Türkçe', 'Almanca', 'Fransızca', 'İspanyolca', 'Portekizce (Brezilya)',
        'Rusça', 'Lehçe (Polonya)', 'Çince (Basitleştirilmiş)', 'Çince (Geleneksel)',
        'Japonca', 'Korece', 'İtalyanca', 'Arapça', 'Tayca', 'Vietnamca', 'Endonezce',
        'Macarca', 'Çekçe', 'Ukraynaca', 'Romence', 'Hollandaca', 'İbranice', 'Fince',
        'Norveççe', 'Danca', 'İsveççe'
      ];

      container.innerHTML = languages.map(lang => `
        <div class="lang-item" style="display: flex; align-items: center; padding: 4px 8px; border-bottom: 1px solid #444; color: #fff; cursor: pointer;" onclick="selectPopupLanguage('${lang}')">
          <span style="font-weight: bold;">${lang}</span>
        </div>
      `).join('');
      container.style.overflowY = 'auto';
    }

    function selectPopupGame(gameName) {
      console.log('Seçilen oyun:', gameName);
      showPopupRankList();
    }

    function selectPopupRank(rankName) {
      console.log('Seçilen rank:', rankName);
      showPopupLanguageList();
    }

    function selectPopupLanguage(languageName) {
      console.log('Seçilen dil:', languageName);
      showPopupTeamSearch();
    }

    function popupTeamSearchAction() {
      const takimAraBtn = document.getElementById('takimAraBtn');
      const animasyon = document.getElementById('takimAramaAnimasyon');
      
      if (animasyon && animasyon.style.display === 'block') {
        // Animasyon açıksa, aramayı iptal et
        console.log('Arama iptal edildi');
        animasyon.style.display = 'none';
        takimAraBtn.textContent = 'Takım Ara';
        takimAraBtn.classList.remove('iptal-modu');
        takimAraBtn.onclick = popupTeamSearchAction;
      } else {
        // Animasyon kapalıysa, aramayı başlat
        console.log('Takım arama başlatıldı');
        if (animasyon) {
          animasyon.style.display = 'block';
        }
        takimAraBtn.textContent = 'Aramayı İptal Et';
        takimAraBtn.classList.add('iptal-modu');
        takimAraBtn.onclick = popupTeamSearchAction;
      }
    }

    function closePopupVideo() {
      const popupVideoPlayer = document.getElementById('popup-video-player');
      if (popupVideoPlayer) {
        popupVideoPlayer.style.display = 'none';
      }
      // Video oynatmayı durdur
      const video = document.getElementById('popup-searching-video');
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      // Oyun seçim penceresine geri dön
      showPopupGameList();
    }

    function filterPopupGames() {
      const input = document.getElementById('popup-game-search');
      const filter = input.value.toUpperCase();
      const items = document.querySelectorAll('#popup-game-items .game-item');
      
      items.forEach(item => {
        const text = item.textContent || item.innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    }

    function filterPopupRanks() {
      const input = document.getElementById('popup-rank-search');
      const filter = input.value.toUpperCase();
      const items = document.querySelectorAll('#popup-rank-items .rank-item');
      
      items.forEach(item => {
        const text = item.textContent || item.innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    }

    function filterPopupLanguages() {
      const input = document.getElementById('popup-lang-search');
      const filter = input.value.toUpperCase();
      const items = document.querySelectorAll('#popup-lang-items .lang-item');
      
      items.forEach(item => {
        const text = item.textContent || item.innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    }

    // Takım Bul butonuna tıklandığında popup içindeki oyun listesini göster
    if (categoryBtn) {
      categoryBtn.addEventListener('click', function() {
        takimBulPopup.style.display = 'flex';
        setTimeout(() => {
          showPopupGameList();
        }, 100);
      });
    }

    // Popup içindeki boş alana tıklandığında oyun seçim penceresine geri dön
    if (takimBulPopup) {
      takimBulPopup.addEventListener('click', function(e) {
        // Eğer tıklanan element popup'ın kendisiyse (boş alan) oyun seçimine geri dön
        if (e.target === takimBulPopup) {
          showPopupGameList();
        }
      });
    }

    // Seçim bilgisini tutacak değişkenler
    let selectedPopupGame = null;
    let selectedPopupRank = null;
    let selectedPopupLanguage = null;

    function updateSelectedInfo() {
      const infoDiv = document.getElementById('selected-info');
      if (!infoDiv) return;
      let html = '';
      if (selectedPopupGame) html += `<div><strong>Seçilen Oyun:</strong> ${selectedPopupGame}</div>`;
      if (selectedPopupRank) html += `<div><strong>Seçilen Rank:</strong> ${selectedPopupRank}</div>`;
      if (selectedPopupLanguage) html += `<div><strong>Seçilen Dil:</strong> ${selectedPopupLanguage}</div>`;
      infoDiv.innerHTML = html.trim();
    }

    // Orijinal fonksiyonları güncelle
    function selectPopupGame(gameName) {
      selectedPopupGame = gameName;
      selectedPopupRank = null;
      selectedPopupLanguage = null;
      updateSelectedInfo();
      showPopupRankList();
    }

    function selectPopupRank(rankName) {
      selectedPopupRank = rankName;
      selectedPopupLanguage = null;
      updateSelectedInfo();
      showPopupLanguageList();
    }

    function selectPopupLanguage(languageName) {
      selectedPopupLanguage = languageName;
      updateSelectedInfo();
      showPopupTeamSearch();
    }

    // Takım Ara popup açıldığında seçimleri sıfırla
    function showPopupGameList() {
      hideAllPopupLists();
      const popupGameList = document.getElementById('popup-game-list');
      if (popupGameList) {
        popupGameList.style.display = 'flex';
        populatePopupGameList();
      }
      selectedPopupGame = null;
      selectedPopupRank = null;
      selectedPopupLanguage = null;
      updateSelectedInfo();
    }

    function popupOzelOdaAraAction() {
      const ozelBtn = document.getElementById('ozelOdaAraBtn');
      const animasyon = document.getElementById('takimAramaAnimasyon');
      if (animasyon && animasyon.style.display === 'block' && ozelBtn.classList.contains('iptal-modu')) {
        // Animasyon açıksa, aramayı iptal et
        animasyon.style.display = 'none';
        ozelBtn.textContent = 'Özel Oda Ara';
        ozelBtn.classList.remove('iptal-modu');
        ozelBtn.onclick = popupOzelOdaAraAction;
      } else {
        // Animasyon kapalıysa, aramayı başlat
        if (animasyon) {
          animasyon.style.display = 'block';
        }
        ozelBtn.textContent = 'Aramayı İptal Et';
        ozelBtn.classList.add('iptal-modu');
        ozelBtn.onclick = popupOzelOdaAraAction;
      }
    }

    function popupHerIkisiniAraAction() {
      const herBtn = document.getElementById('herIkisiniAraBtn');
      const animasyon = document.getElementById('takimAramaAnimasyon');
      if (animasyon && animasyon.style.display === 'block' && herBtn.classList.contains('iptal-modu')) {
        // Animasyon açıksa, aramayı iptal et
        animasyon.style.display = 'none';
        herBtn.textContent = 'Her İkisini Ara';
        herBtn.classList.remove('iptal-modu');
        herBtn.onclick = popupHerIkisiniAraAction;
      } else {
        // Animasyon kapalıysa, aramayı başlat
        if (animasyon) {
          animasyon.style.display = 'block';
        }
        herBtn.textContent = 'Aramayı İptal Et';
        herBtn.classList.add('iptal-modu');
        herBtn.onclick = popupHerIkisiniAraAction;
      }
    }

    // Sunucu Oluştur Popup Fonksiyonları
    function openServerCreatePopup() {
      const popup = document.getElementById('serverCreatePopup');
      if (popup) {
        popup.style.display = 'flex';
        // Body'ye popup-open class'ı ekle
        document.body.classList.add('popup-open');
      }
    }

    function closeServerCreatePopup() {
      const popup = document.getElementById('serverCreatePopup');
      if (popup) {
        popup.style.display = 'none';
        // Body'den popup-open class'ını kaldır
        document.body.classList.remove('popup-open');
      }
    }

    // Popup dışına tıklandığında kapatma
    document.addEventListener('DOMContentLoaded', function() {
      const popup = document.getElementById('serverCreatePopup');
      if (popup) {
        popup.addEventListener('click', function(e) {
          if (e.target === popup) {
            closeServerCreatePopup();
          }
        });
      }
    });

    // Sunucu Keşfet butonuna tıklama
    function openServerDiscover() {
      closeServerCreatePopup(); // Popup'ı kapat
      showTab('search-server'); // Sunucu Keşfet sekmesini aç
    }

    // Pencere kontrol fonksiyonları
    function minimizeWindow() {
      if (window.electronAPI) {
        window.electronAPI.windowControl('minimize');
      } else {
        // Fallback for web browser
        console.log('Minimize clicked');
      }
    }

    function maximizeWindow() {
      if (window.electronAPI) {
        window.electronAPI.windowControl('maximize');
      } else {
        // Fallback for web browser
        console.log('Maximize clicked');
      }
    }

    function closeWindow() {
      if (window.electronAPI) {
        window.electronAPI.windowControl('close');
      } else {
        // Fallback for web browser
        console.log('Close clicked');
        if (confirm('Uygulamayı kapatmak istediğinizden emin misiniz?')) {
          window.close();
        }
      }
    }

    // Kulaklık ikonu toggle fonksiyonu
    function toggleHeadphone() {
      const headphoneIcon = document.getElementById('headphoneIcon');
      if (headphoneIcon.src.includes('headphoneson.svg')) {
        headphoneIcon.src = 'ico/headphoneoff.svg';
        headphoneIcon.alt = 'Kulaklık Kapalı';
      } else {
        headphoneIcon.src = 'ico/headphoneson.svg';
        headphoneIcon.alt = 'Kulaklık';
      }
    }

    // Mikrofon ikonu toggle fonksiyonu
    function toggleMicrophone() {
      const microphoneIcon = document.getElementById('microphoneIcon');
      if (microphoneIcon.src.includes('micon.svg')) {
        microphoneIcon.src = 'ico/micoff.svg';
        microphoneIcon.alt = 'Mikrofon Kapalı';
      } else {
        microphoneIcon.src = 'ico/micon.svg';
        microphoneIcon.alt = 'Mikrofon';
      }
    }

    // Haberler penceresi toggle fonksiyonu
    function toggleNewsWindow() {
      const newsWindow = document.getElementById('newsWindow');
      const newsIcon = document.querySelector('img[src="ico/haberler.svg"]');
      
      if (newsWindow.style.display === 'none' || newsWindow.style.display === '') {
        // İkonun pozisyonunu al
        const iconRect = newsIcon.getBoundingClientRect();
        
        // Pencereyi ikonun altında konumlandır
        newsWindow.style.left = (iconRect.left - 175) + 'px'; // 350px genişliğin yarısı kadar sola kaydır
        newsWindow.style.top = (iconRect.bottom + 5) + 'px'; // İkonun 5px altında
        
        newsWindow.style.display = 'block';
        
        // Pencere içine tıklama event'ini durdur
        newsWindow.addEventListener('click', function(e) {
          e.stopPropagation();
        });
        
        // Pencere dışına tıklama event listener'ı ekle (kısa gecikme ile)
        setTimeout(() => {
          document.addEventListener('click', closeNewsWindowOnOutsideClick);
        }, 100);
      } else {
        newsWindow.style.display = 'none';
        // Event listener'ı kaldır
        document.removeEventListener('click', closeNewsWindowOnOutsideClick);
      }
    }

    // Pencere dışına tıklama ile kapatma fonksiyonu
    function closeNewsWindowOnOutsideClick(event) {
      const newsWindow = document.getElementById('newsWindow');
      const newsIcon = document.querySelector('img[src="ico/haberler.svg"]');
      
      // Eğer haberler ikonuna tıklandıysa pencereyi kapatma
      if (event.target === newsIcon || newsIcon.contains(event.target)) {
        return;
      }
      
      if (!newsWindow.contains(event.target)) {
        newsWindow.style.display = 'none';
        // Event listener'ı kaldır
        document.removeEventListener('click', closeNewsWindowOnOutsideClick);
      }
    }

    // Hava Durumu penceresi toggle fonksiyonu
    function toggleWeatherWindow() {
      const weatherWindow = document.getElementById('weatherWindow');
      const weatherIcon = document.querySelector('img[src="ico/havadurumu.svg"]');
      
      if (weatherWindow.style.display === 'none' || weatherWindow.style.display === '') {
        // İkonun pozisyonunu al
        const iconRect = weatherIcon.getBoundingClientRect();
        
        // Pencereyi ikonun altında konumlandır
        weatherWindow.style.left = (iconRect.left - 175) + 'px'; // 350px genişliğin yarısı kadar sola kaydır
        weatherWindow.style.top = (iconRect.bottom + 5) + 'px'; // İkonun 5px altında
        
        weatherWindow.style.display = 'block';
        
        // Pencere içine tıklama event'ini durdur
        weatherWindow.addEventListener('click', function(e) {
          e.stopPropagation();
        });
        
        // Pencere dışına tıklama event listener'ı ekle (kısa gecikme ile)
        setTimeout(() => {
          document.addEventListener('click', closeWeatherWindowOnOutsideClick);
        }, 100);
      } else {
        weatherWindow.style.display = 'none';
        // Event listener'ı kaldır
        document.removeEventListener('click', closeWeatherWindowOnOutsideClick);
      }
    }

    // Hava Durumu penceresi dışına tıklama ile kapatma fonksiyonu
    function closeWeatherWindowOnOutsideClick(event) {
      const weatherWindow = document.getElementById('weatherWindow');
      const weatherIcon = document.querySelector('img[src="ico/havadurumu.svg"]');
      
      // Eğer hava durumu ikonuna tıklandıysa pencereyi kapatma
      if (event.target === weatherIcon || weatherIcon.contains(event.target)) {
        return;
      }
      
      if (!weatherWindow.contains(event.target)) {
        weatherWindow.style.display = 'none';
        // Event listener'ı kaldır
        document.removeEventListener('click', closeWeatherWindowOnOutsideClick);
      }
    }

    // Deprem penceresi toggle fonksiyonu
    function toggleEarthquakeWindow() {
      const earthquakeWindow = document.getElementById('earthquakeWindow');
      const earthquakeIcon = document.querySelector('img[src="ico/deprem.svg"]');
      
      if (earthquakeWindow.style.display === 'none' || earthquakeWindow.style.display === '') {
        // İkonun pozisyonunu al
        const iconRect = earthquakeIcon.getBoundingClientRect();
        
        // Pencereyi ikonun altında konumlandır
        earthquakeWindow.style.left = (iconRect.left - 175) + 'px'; // 350px genişliğin yarısı kadar sola kaydır
        earthquakeWindow.style.top = (iconRect.bottom + 5) + 'px'; // İkonun 5px altında
        
        earthquakeWindow.style.display = 'block';
        
        // Pencere içine tıklama event'ini durdur
        earthquakeWindow.addEventListener('click', function(e) {
          e.stopPropagation();
        });
        
        // Pencere dışına tıklama event listener'ı ekle (kısa gecikme ile)
        setTimeout(() => {
          document.addEventListener('click', closeEarthquakeWindowOnOutsideClick);
        }, 100);
      } else {
        earthquakeWindow.style.display = 'none';
        // Event listener'ı kaldır
        document.removeEventListener('click', closeEarthquakeWindowOnOutsideClick);
      }
    }

    // Deprem penceresi dışına tıklama ile kapatma fonksiyonu
    function closeEarthquakeWindowOnOutsideClick(event) {
      const earthquakeWindow = document.getElementById('earthquakeWindow');
      const earthquakeIcon = document.querySelector('img[src="ico/deprem.svg"]');
      
      // Eğer deprem ikonuna tıklandıysa pencereyi kapatma
      if (event.target === earthquakeIcon || earthquakeIcon.contains(event.target)) {
        return;
      }
      
      if (!earthquakeWindow.contains(event.target)) {
        earthquakeWindow.style.display = 'none';
        // Event listener'ı kaldır
        document.removeEventListener('click', closeEarthquakeWindowOnOutsideClick);
      }
    }

    // Çeviri penceresi toggle fonksiyonu
    function toggleTranslationWindow() {
      const translationWindow = document.getElementById('translationWindow');
      const translationIcon = document.querySelector('img[src="ico/çeviri.svg"]');
      
      if (translationWindow.style.display === 'none' || translationWindow.style.display === '') {
        // İkonun pozisyonunu al
        const iconRect = translationIcon.getBoundingClientRect();
        
        // Pencereyi ikonun altında konumlandır
        translationWindow.style.left = (iconRect.left - 175) + 'px';
        translationWindow.style.top = (iconRect.bottom + 5) + 'px';
        
        translationWindow.style.display = 'block';
        
        // Pencere içine tıklama event'ini durdur
        translationWindow.addEventListener('click', function(e) {
          e.stopPropagation();
        });
        
        // Pencere dışına tıklama event listener'ı ekle
        setTimeout(() => {
          document.addEventListener('click', closeTranslationWindowOnOutsideClick);
        }, 100);
      } else {
        translationWindow.style.display = 'none';
        document.removeEventListener('click', closeTranslationWindowOnOutsideClick);
      }
    }

    // Çeviri penceresi dışına tıklama ile kapatma fonksiyonu
    function closeTranslationWindowOnOutsideClick(event) {
      const translationWindow = document.getElementById('translationWindow');
      const translationIcon = document.querySelector('img[src="ico/çeviri.svg"]');
      
      if (event.target === translationIcon || translationIcon.contains(event.target)) {
        return;
      }
      
      if (!translationWindow.contains(event.target)) {
        translationWindow.style.display = 'none';
        document.removeEventListener('click', closeTranslationWindowOnOutsideClick);
      }
    }

    // ChatGPT penceresi toggle fonksiyonu
    function toggleChatGPTWindow() {
      const chatgptWindow = document.getElementById('chatgptWindow');
      const chatgptIcon = document.querySelector('img[src="ico/chatgpt.svg"]');
      
      if (chatgptWindow.style.display === 'none' || chatgptWindow.style.display === '') {
        const iconRect = chatgptIcon.getBoundingClientRect();
        
        chatgptWindow.style.left = (iconRect.left - 175) + 'px';
        chatgptWindow.style.top = (iconRect.bottom + 5) + 'px';
        
        chatgptWindow.style.display = 'block';
        
        chatgptWindow.addEventListener('click', function(e) {
          e.stopPropagation();
        });
        
        setTimeout(() => {
          document.addEventListener('click', closeChatGPTWindowOnOutsideClick);
        }, 100);
      } else {
        chatgptWindow.style.display = 'none';
        document.removeEventListener('click', closeChatGPTWindowOnOutsideClick);
      }
    }

    // ChatGPT penceresi dışına tıklama ile kapatma fonksiyonu
    function closeChatGPTWindowOnOutsideClick(event) {
      const chatgptWindow = document.getElementById('chatgptWindow');
      const chatgptIcon = document.querySelector('img[src="ico/chatgpt.svg"]');
      
      if (event.target === chatgptIcon || chatgptIcon.contains(event.target)) {
        return;
      }
      
      if (!chatgptWindow.contains(event.target)) {
        chatgptWindow.style.display = 'none';
        document.removeEventListener('click', closeChatGPTWindowOnOutsideClick);
      }
    }

    // Face penceresi toggle fonksiyonu
    function toggleFaceWindow() {
      const win = document.getElementById('faceWindow');
      const content = win.querySelector('.face-window-content');
      if (win.style.display === 'none' || win.style.display === '') {
        win.style.display = 'flex';
        if (!content._stopPropAdded) {
          content.addEventListener('mousedown', function(e) { e.stopPropagation(); });
          content._stopPropAdded = true;
        }
        // Dışarı tıklama ile kapanma kaldırıldı
      } else {
        win.style.display = 'none';
      }
    }

    function closeFaceWindow() {
      const win = document.getElementById('faceWindow');
      win.style.display = 'none';
    }

    // Kur penceresi toggle fonksiyonu
    function toggleKurWindow() {
      const kurWindow = document.getElementById('kurWindow');
      const kurIcon = document.querySelector('img[src=\"ico/kur.svg\"]');
      
      if (kurWindow.style.display === 'none' || kurWindow.style.display === '') {
        const iconRect = kurIcon.getBoundingClientRect();
        kurWindow.style.left = (iconRect.left - 175) + 'px';
        kurWindow.style.top = (iconRect.bottom + 5) + 'px';
        kurWindow.style.display = 'block';
        kurWindow.addEventListener('click', function(e) { e.stopPropagation(); });
        setTimeout(() => {
          document.addEventListener('click', closeKurWindowOnOutsideClick);
        }, 100);
      } else {
        kurWindow.style.display = 'none';
        document.removeEventListener('click', closeKurWindowOnOutsideClick);
      }
    }
    // Kur penceresi dışına tıklama ile kapatma fonksiyonu
    function closeKurWindowOnOutsideClick(event) {
      const kurWindow = document.getElementById('kurWindow');
      const kurIcon = document.querySelector('img[src=\"ico/kur.svg\"]');
      if (event.target === kurIcon || kurIcon.contains(event.target)) { return; }
      if (!kurWindow.contains(event.target)) {
        kurWindow.style.display = 'none';
        document.removeEventListener('click', closeKurWindowOnOutsideClick);
      }
    }

    // Takvim penceresi toggle fonksiyonu
    function toggleCalendarWindow() {
      const calendarWindow = document.getElementById('calendarWindow');
      const clockElement = document.getElementById('clock');
      
      if (calendarWindow.style.display === 'none' || calendarWindow.style.display === '') {
        const clockRect = clockElement.getBoundingClientRect();
        calendarWindow.style.left = (clockRect.left - 175) + 'px';
        calendarWindow.style.top = (clockRect.bottom + 5) + 'px';
        calendarWindow.style.display = 'block';
        calendarWindow.addEventListener('click', function(e) { e.stopPropagation(); });
        setTimeout(() => {
          document.addEventListener('click', closeCalendarWindowOnOutsideClick);
        }, 100);
        generateCalendar();
      } else {
        calendarWindow.style.display = 'none';
        document.removeEventListener('click', closeCalendarWindowOnOutsideClick);
      }
    }

    // Takvim penceresi dışına tıklama ile kapatma fonksiyonu
    function closeCalendarWindowOnOutsideClick(event) {
      const calendarWindow = document.getElementById('calendarWindow');
      const clockElement = document.getElementById('clock');
      if (event.target === clockElement || clockElement.contains(event.target)) { return; }
      if (!calendarWindow.contains(event.target)) {
        calendarWindow.style.display = 'none';
        document.removeEventListener('click', closeCalendarWindowOnOutsideClick);
      }
    }

    // Takvim oluşturma fonksiyonu
    function generateCalendar() {
      const calendarDiv = document.getElementById('calendar');
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDay = (firstDay.getDay() + 6) % 7; // Pazartesi'yi 0 yapmak için
      
      const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
                         'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
      
      let calendarHTML = `
        <div class="calendar-header">
          <span class="calendar-month">${monthNames[month]} ${year}</span>
        </div>
        <div class="calendar-grid">
          <div class="calendar-day-header">Pzt</div>
          <div class="calendar-day-header">Sal</div>
          <div class="calendar-day-header">Çar</div>
          <div class="calendar-day-header">Per</div>
          <div class="calendar-day-header">Cum</div>
          <div class="calendar-day-header">Cmt</div>
          <div class="calendar-day-header">Paz</div>
      `;
      
      // Boş günler için
      for (let i = 0; i < startingDay; i++) {
        calendarHTML += '<div class="calendar-day empty"></div>';
      }
      
      // Ayın günleri
      for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === now.getDate();
        const dayClass = isToday ? 'calendar-day today' : 'calendar-day';
        calendarHTML += `<div class="${dayClass}">${day}</div>`;
      }
      
      calendarHTML += '</div>';
      calendarDiv.innerHTML = calendarHTML;
    }

    // Shadow Play toggle fonksiyonu
    function toggleShadowPlay() {
      const shadowPlayIcon = document.getElementById('shadowPlayIcon');
      if (shadowPlayIcon.src.includes('shadownplayon.svg')) {
        shadowPlayIcon.src = 'ico/shadownplayoff.svg';
        shadowPlayIcon.alt = 'Shadow Play Off';
      } else {
        shadowPlayIcon.src = 'ico/shadownplayon.svg';
        shadowPlayIcon.alt = 'Shadow Play';
      }
    }

    // Hatırlatıcı pencere toggle fonksiyonu
    function toggleReminderWindow() {
      const reminderWindow = document.getElementById('reminderWindow');
      const reminderIcon = document.getElementById('reminderIcon');
      if (reminderWindow.style.display === 'none' || reminderWindow.style.display === '') {
        const iconRect = reminderIcon.getBoundingClientRect();
        reminderWindow.style.left = (iconRect.left - 100) + 'px';
        reminderWindow.style.top = (iconRect.bottom + 5) + 'px';
        reminderWindow.style.display = 'block';
        reminderWindow.addEventListener('click', function(e) { e.stopPropagation(); });
        setTimeout(() => {
          document.addEventListener('click', closeReminderWindowOnOutsideClick);
        }, 100);
      } else {
        reminderWindow.style.display = 'none';
        document.removeEventListener('click', closeReminderWindowOnOutsideClick);
      }
    }
    // Hatırlatıcı pencere dışına tıklama ile kapatma fonksiyonu
    function closeReminderWindowOnOutsideClick(event) {
      const reminderWindow = document.getElementById('reminderWindow');
      const reminderIcon = document.getElementById('reminderIcon');
      if (event.target === reminderIcon || reminderIcon.contains(event.target)) { return; }
      if (!reminderWindow.contains(event.target)) {
        reminderWindow.style.display = 'none';
        document.removeEventListener('click', closeReminderWindowOnOutsideClick);
      }
    }
    // Alarm kurma fonksiyonu
    let alarmTimeout;
    function setAlarm(event) {
      event.preventDefault();
      clearTimeout(alarmTimeout);
      const time = document.getElementById('alarmTime').value;
      const note = document.getElementById('alarmNote').value;
      const now = new Date();
      const [h, m] = time.split(":");
      const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0);
      if (alarmDate <= now) alarmDate.setDate(alarmDate.getDate() + 1);
      const diff = alarmDate - now;
      document.getElementById('alarmMessage').textContent = `Alarm kuruldu: ${time} (${note})`;
      alarmTimeout = setTimeout(() => {
        alert(`⏰ Alarm! ${note ? note : ''}`);
        document.getElementById('alarmMessage').textContent = '';
      }, diff);
    }

    // Hesap makinesi pencere toggle fonksiyonu
    function toggleCalculatorWindow() {
      const calculatorWindow = document.getElementById('calculatorWindow');
      const calculatorIcon = document.getElementById('calculatorIcon');
      if (calculatorWindow.style.display === 'none' || calculatorWindow.style.display === '') {
        const iconRect = calculatorIcon.getBoundingClientRect();
        calculatorWindow.style.left = (iconRect.left - 100) + 'px';
        calculatorWindow.style.top = (iconRect.bottom + 5) + 'px';
        calculatorWindow.style.display = 'block';
        calculatorWindow.addEventListener('click', function(e) { e.stopPropagation(); });
        setTimeout(() => {
          document.addEventListener('click', closeCalculatorWindowOnOutsideClick);
        }, 100);
      } else {
        calculatorWindow.style.display = 'none';
        document.removeEventListener('click', closeCalculatorWindowOnOutsideClick);
      }
    }
    // Hesap makinesi pencere dışına tıklama ile kapatma fonksiyonu
    function closeCalculatorWindowOnOutsideClick(event) {
      const calculatorWindow = document.getElementById('calculatorWindow');
      const calculatorIcon = document.getElementById('calculatorIcon');
      if (event.target === calculatorIcon || calculatorIcon.contains(event.target)) { return; }
      if (!calculatorWindow.contains(event.target)) {
        calculatorWindow.style.display = 'none';
        document.removeEventListener('click', closeCalculatorWindowOnOutsideClick);
      }
    }
    // Hesap makinesi fonksiyonları
    function appendToDisplay(value) {
      document.getElementById('calculatorDisplay').value += value;
    }
    function clearDisplay() {
      document.getElementById('calculatorDisplay').value = '';
    }
    function deleteLastChar() {
      const display = document.getElementById('calculatorDisplay');
      display.value = display.value.slice(0, -1);
    }
    function calculate() {
      const display = document.getElementById('calculatorDisplay');
      try {
        display.value = eval(display.value);
      } catch (error) {
        display.value = 'Hata';
      }
    }

    // Not defteri pencere toggle fonksiyonu
    function toggleNoteWindow() {
      const noteWindow = document.getElementById('noteWindow');
      const noteIcon = document.getElementById('noteIcon');
      if (noteWindow.style.display === 'none' || noteWindow.style.display === '') {
        const iconRect = noteIcon.getBoundingClientRect();
        noteWindow.style.left = (iconRect.left - 200) + 'px';
        noteWindow.style.top = (iconRect.bottom + 5) + 'px';
        noteWindow.style.display = 'block';
        noteWindow.addEventListener('click', function(e) { e.stopPropagation(); });
        setTimeout(() => {
          document.addEventListener('click', closeNoteWindowOnOutsideClick);
        }, 100);
        // Kaydedilmiş notu yükle
        loadNote();
      } else {
        noteWindow.style.display = 'none';
        document.removeEventListener('click', closeNoteWindowOnOutsideClick);
      }
    }
    // Not defteri pencere dışına tıklama ile kapatma fonksiyonu
    function closeNoteWindowOnOutsideClick(event) {
      const noteWindow = document.getElementById('noteWindow');
      const noteIcon = document.getElementById('noteIcon');
      if (event.target === noteIcon || noteIcon.contains(event.target)) { return; }
      if (!noteWindow.contains(event.target)) {
        noteWindow.style.display = 'none';
        document.removeEventListener('click', closeNoteWindowOnOutsideClick);
      }
    }
    // Not yükleme fonksiyonu
    function loadNote() {
      const savedNote = localStorage.getItem('savedNote');
      if (savedNote) {
        document.getElementById('noteTextarea').value = savedNote;
      }
    }
    // Otomatik kaydetme fonksiyonu
    function autoSaveNote() {
      const noteText = document.getElementById('noteTextarea').value;
      localStorage.setItem('savedNote', noteText);
    }
    // Sayfa yüklendiğinde not defteri event listener'ını ekle
    document.addEventListener('DOMContentLoaded', function() {
      const noteTextarea = document.getElementById('noteTextarea');
      if (noteTextarea) {
        noteTextarea.addEventListener('input', autoSaveNote);
      }
    });
    
    // Seçili oyunu gösterme fonksiyonu
    function showSelectedGame() {
      const selectedGameDisplay = document.getElementById('selectedGameDisplay');
      if (selectedGameDisplay.style.display !== 'none') {
        selectedGameDisplay.style.display = 'flex';
      }
    }
    
    // Seçili oyunu gizleme fonksiyonu
    function hideSelectedGame() {
      const selectedGameDisplay = document.getElementById('selectedGameDisplay');
      selectedGameDisplay.style.display = 'none';
    }

    function toggleOyunBulWindow() {
      const win = document.getElementById('oyunBulWindow');
      const content = win.querySelector('.oyunbul-window-content');
      if (win.style.display === 'none' || win.style.display === '') {
        win.style.display = 'flex';
        // Sadece ilk açılışta ekle
        if (!content._stopPropAdded) {
          content.addEventListener('mousedown', function(e) { e.stopPropagation(); });
          content._stopPropAdded = true;
        }
        // Dışarı tıklama ile kapanma kaldırıldı
        
        // Grid layout'u düzgün şekilde başlat
        setTimeout(() => {
          const gameButtonsContainer = document.getElementById('gameButtonsContainer');
          if (gameButtonsContainer) {
            gameButtonsContainer.style.display = 'grid';
          }
        }, 50);
        
        // Seçili oyunu göster
        showSelectedGame();
      } else {
        win.style.display = 'none';
        // Pencere kapandığında seçili oyunu gizle
        hideSelectedGame();
      }
    }
    function closeOyunBulWindow() {
      // Ses çal
      const sekmetonSound = new Audio('sound/sekmeton.mp3');
      sekmetonSound.play();
      
      const win = document.getElementById('oyunBulWindow');
      win.style.display = 'none';
      
      // Pencereyi oyun seçimine sıfırla
      resetToGameSelection();
      
      // Grid layout'u yeniden düzenle
      setTimeout(() => {
        const gameButtonsContainer = document.getElementById('gameButtonsContainer');
        if (gameButtonsContainer) {
          gameButtonsContainer.style.display = 'none';
          setTimeout(() => {
            gameButtonsContainer.style.display = 'grid';
          }, 10);
        }
      }, 100);
    }

    function selectGame(gameName) {
      console.log('Seçilen oyun:', gameName);
      
      // Ses çal
      const gameClickSound = new Audio('sound/Gameclick.mp3');
      gameClickSound.play();
      
      // Seçilen oyunun iconunu ve adını bul
      const gameButton = event.target.closest('.oyun-btn');
      const gameIcon = gameButton.querySelector('.oyun-icon');
      const gameTitle = gameButton.getAttribute('title');
      
      // Seçilen oyunu göster
      const selectedGameDisplay = document.getElementById('selectedGameDisplay');
      const selectedGameIcon = document.getElementById('selectedGameIcon');
      const selectedRankIcon = document.getElementById('selectedRankIcon');
      
      selectedGameIcon.src = gameIcon.src;
      selectedGameDisplay.style.display = 'flex';
      selectedRankIcon.style.display = 'none'; // Rank iconunu gizle
      
      // Oyun seçildikten sonra rank seçimine geç
      showRankSelection();
      
      // Kullanıcıya bilgi ver
      console.log(`${gameTitle} oyunu seçildi!`);
    }

    function selectRank(rankName) {
      console.log('Seçilen rank:', rankName);
      
      // Ses çal
      const rankSelectSound = new Audio('sound/rankseç.mp3');
      rankSelectSound.play();
      
      // Seçilen rankın iconunu ve adını bul
      const rankButton = event.target.closest('.rank-btn');
      const rankIcon = rankButton.querySelector('.rank-icon');
      const rankTitle = rankButton.getAttribute('title');
      
      // Seçilen rankı göster
      const selectedRankIcon = document.getElementById('selectedRankIcon');
      const selectedRankImg = document.getElementById('selectedRankImg');
      
      selectedRankImg.src = rankIcon.src;
      selectedRankIcon.style.display = 'flex';
      
      // Rank seçildikten sonra dil seçimine geç
      showDilSelection();
      
      // Kullanıcıya bilgi ver
      console.log(`${rankTitle} rankı seçildi!`);
    }

    function selectDil(dilName) {
      console.log('Seçilen dil:', dilName);
      
      // Ses çal
      const dilSelectSound = new Audio('sound/rankseç.mp3');
      dilSelectSound.play();
      
      // Seçilen dilin iconunu ve adını bul
      const dilButton = event.target.closest('.dil-btn');
      const dilIcon = dilButton.querySelector('.dil-icon');
      const dilTitle = dilButton.getAttribute('title');
      
      // Seçilen dili göster
      const selectedDilIcon = document.getElementById('selectedDilIcon');
      const selectedDilImg = document.getElementById('selectedDilImg');
      
      selectedDilImg.src = dilIcon.src;
      selectedDilIcon.style.display = 'flex';
      
      // Aramayı Başlat butonunu 1.5 saniye sonra göster
      setTimeout(() => {
        const aramaBaslatBtn = document.getElementById('aramaBaslatBtn');
        aramaBaslatBtn.style.display = 'block';
      }, 1500);
      
      // Kullanıcıya bilgi ver
      console.log(`${dilTitle} dili seçildi!`);
    }

    function startSearch() {
      console.log('Arama başlatılıyor...');
      
      // Ses çal
      const searchSound = new Audio('sound/sekmeton.mp3');
      searchSound.play();
      
    }

    function showRankSelection() {
      // Başlığı değiştir
      const title = document.querySelector('.oyunbul-title');
      title.textContent = 'Hangi Rankta Oynamak İstiyorsunuz?';
      
      // Oyun arama kutusunu gizle
      const searchContainer = document.querySelector('.oyun-search-container');
      searchContainer.style.display = 'none';
      
      // Oyun butonlarını gizle
      const gameButtonsContainer = document.getElementById('gameButtonsContainer');
      gameButtonsContainer.style.display = 'none';
      
      // Rank butonlarını göster
      const rankButtonsContainer = document.getElementById('rankButtonsContainer');
      rankButtonsContainer.style.display = 'flex';
    }

    function showDilSelection() {
      // Başlığı değiştir
      const title = document.querySelector('.oyunbul-title');
      title.textContent = 'Dil Seçiniz?';
      
      // Rank butonlarını gizle
      const rankButtonsContainer = document.getElementById('rankButtonsContainer');
      rankButtonsContainer.style.display = 'none';
      
      // Dil butonlarını göster
      const dilButtonsContainer = document.getElementById('dilButtonsContainer');
      dilButtonsContainer.style.display = 'flex';
    }

    function goBackToRankSelection() {
      // Ses çal
      const sekmetonSound = new Audio('sound/sekmeton.mp3');
      sekmetonSound.play();
      
      // Başlığı değiştir
      const title = document.querySelector('.oyunbul-title');
      title.textContent = 'Hangi Rankta Oynamak İstiyorsunuz?';
      
      // Dil butonlarını gizle
      const dilButtonsContainer = document.getElementById('dilButtonsContainer');
      dilButtonsContainer.style.display = 'none';
      
      // Rank butonlarını göster
      const rankButtonsContainer = document.getElementById('rankButtonsContainer');
      rankButtonsContainer.style.display = 'flex';
      
      // Seçili dili gizle
      const selectedDilIcon = document.getElementById('selectedDilIcon');
      if (selectedDilIcon) {
        selectedDilIcon.style.display = 'none';
      }
      
      // Aramayı Başlat butonunu gizle
      const aramaBaslatBtn = document.getElementById('aramaBaslatBtn');
      aramaBaslatBtn.style.display = 'none';
    }

    function resetToGameSelection() {
      // Başlığı geri değiştir
      const title = document.querySelector('.oyunbul-title');
      title.textContent = 'Ne Oynamak İstiyorsunuz?';
      
      // Oyun arama kutusunu göster
      const searchContainer = document.querySelector('.oyun-search-container');
      searchContainer.style.display = 'block';
      
      // Oyun butonlarını göster
      const gameButtonsContainer = document.getElementById('gameButtonsContainer');
      gameButtonsContainer.style.display = 'flex';
      
      // Rank butonlarını gizle
      const rankButtonsContainer = document.getElementById('rankButtonsContainer');
      rankButtonsContainer.style.display = 'none';
      
      // Dil butonlarını gizle
      const dilButtonsContainer = document.getElementById('dilButtonsContainer');
      dilButtonsContainer.style.display = 'none';
      
      // Seçili oyunu, rankı ve dili gizle
      const selectedGameDisplay = document.getElementById('selectedGameDisplay');
      const selectedRankIcon = document.getElementById('selectedRankIcon');
      const selectedDilIcon = document.getElementById('selectedDilIcon');
      selectedGameDisplay.style.display = 'none';
      selectedRankIcon.style.display = 'none';
      if (selectedDilIcon) {
        selectedDilIcon.style.display = 'none';
      }
      
      // Aramayı Başlat butonunu gizle
      const aramaBaslatBtn = document.getElementById('aramaBaslatBtn');
      aramaBaslatBtn.style.display = 'none';
    }

    function goBackToGameSelection() {
      // Ses çal
      const sekmetonSound = new Audio('sound/sekmeton.mp3');
      sekmetonSound.play();
      
      // Oyun seçimine geri dön
      resetToGameSelection();
      
      // Grid layout'u düzgün şekilde başlat
      setTimeout(() => {
        const gameButtonsContainer = document.getElementById('gameButtonsContainer');
        if (gameButtonsContainer) {
          gameButtonsContainer.style.display = 'grid';
        }
      }, 50);
    }

    function filterOyunlar() {
      const searchInput = document.getElementById('oyunSearchInput');
      const searchTerm = searchInput.value.toLowerCase();
      const oyunButtons = document.querySelectorAll('.oyun-btn');
      
      oyunButtons.forEach(button => {
        const title = button.getAttribute('title').toLowerCase();
        if (title.includes(searchTerm)) {
          button.style.display = 'flex';
        } else {
          button.style.display = 'none';
        }
      });
    }

    function toggleSunucuBulWindow() {
      const win = document.getElementById('sunucuBulWindow');
      const content = win.querySelector('.sunucubul-window-content');
      if (win.style.display === 'none' || win.style.display === '') {
        win.style.display = 'flex';
        if (!content._stopPropAdded) {
          content.addEventListener('mousedown', function(e) { e.stopPropagation(); });
          content._stopPropAdded = true;
        }
        // Dışarı tıklama ile kapanma kaldırıldı
      } else {
        win.style.display = 'none';
      }
    }
    
    function closeSunucuBulWindow() {
      const win = document.getElementById('sunucuBulWindow');
      win.style.display = 'none';
    }

    function toggleMusicWindow() {
      const win = document.getElementById('musicWindow');
      const content = win.querySelector('.music-window-content');
      const icon = document.getElementById('musicIcon');
      const popupWidth = 250;
      const popupHeight = 550;
      if (win.style.display === 'none' || win.style.display === '') {
        // Pozisyonu hesapla - ikonun tam altında açılsın
        const iconRect = icon.getBoundingClientRect();
        const left = iconRect.left + (iconRect.width / 2) - (popupWidth / 2); // İkonun ortasına hizala
        const top = iconRect.bottom + 10; // İkonun altında 10px boşluk
        win.style.left = left + 'px';
        win.style.top = top + 'px';
        win.style.display = 'block';
        if (!content._stopPropAdded) {
          content.addEventListener('mousedown', function(e) { e.stopPropagation(); });
          content._stopPropAdded = true;
        }
        setTimeout(() => {
          document.addEventListener('mousedown', closeMusicWindowOnOutsideClick);
        }, 100);
      } else {
        win.style.display = 'none';
        document.removeEventListener('mousedown', closeMusicWindowOnOutsideClick);
      }
    }
    function closeMusicWindowOnOutsideClick(e) {
      const win = document.getElementById('musicWindow');
      const icon = document.getElementById('musicIcon');
      if (!win.contains(e.target) && e.target !== icon) {
        win.style.display = 'none';
        document.removeEventListener('mousedown', closeMusicWindowOnOutsideClick);
      }
    }

    function toggleEtkinlikWindow() {
      const win = document.getElementById('etkinlikWindow');
      const content = win.querySelector('.etkinlik-window-content');
      if (win.style.display === 'none' || win.style.display === '') {
        // Ekranın ortasında 1307x815 pencere
        const windowWidth = 1307;
        const windowHeight = 815;
        const left = (window.innerWidth - windowWidth) / 2 + 25; // 25px sağa kaydır
        const top = (window.innerHeight - windowHeight) / 2;
        
        win.style.left = left + 'px';
        win.style.top = top + 'px';
        win.style.width = windowWidth + 'px';
        win.style.height = windowHeight + 'px';
        win.style.display = 'flex';
        
        if (!content._stopPropAdded) {
          content.addEventListener('mousedown', function(e) { e.stopPropagation(); });
          content._stopPropAdded = true;
        }
        setTimeout(() => {
          win.addEventListener('mousedown', closeEtkinlikWindowOnOutsideClick);
        }, 100);
      } else {
        win.style.display = 'none';
        win.removeEventListener('mousedown', closeEtkinlikWindowOnOutsideClick);
      }
    }
    
    function closeEtkinlikWindow() {
      const win = document.getElementById('etkinlikWindow');
      win.style.display = 'none';
      win.removeEventListener('mousedown', closeEtkinlikWindowOnOutsideClick);
    }
    
    function closeEtkinlikWindowOnOutsideClick(e) {
      const win = document.getElementById('etkinlikWindow');
      if (e.target === win) {
        win.style.display = 'none';
        win.removeEventListener('mousedown', closeEtkinlikWindowOnOutsideClick);
      }
    }

    // ...existing code...
document.getElementById('aramaBaslatBtn').addEventListener('click', function() {
    const audio = new Audio('sound/Aramabuton.mp3');
    audio.play();
});
