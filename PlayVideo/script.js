document.addEventListener('DOMContentLoaded', function () {
    const albums = [
        {
            name: '',
            cover: 'https://wallpapercave.com/wp/wp13348313.jpg',
            videos: [
              'https://vimeo.com/307791576',
                'https://vimeo.com/384878999',
              'https://vimeo.com/345036555',
              'https://vimeo.com/306676681',
              'https://player.vimeo.com/video/378788675',
                
            ]
        },
        {
            name: '',
            cover: 'https://wallpapercave.com/wp/wp13477520.jpg',
            videos: [
                'https://www.youtube.com/watch?v=QnCs2nsZGRk',
                'https://www.youtube.com/watch?v=gMcbiuNYnQY'
            ]
        },
        {
            name: 'Album 3',
            cover: 'https://wallpapercave.com/wp/wp4625890.jpg',
            videos: [
                'https://player.vimeo.com/video/568654394',
                'https://player.vimeo.com/video/905584986'
            ]
        },
  
    ];

    let currentAlbumIndex = 0;
    let currentVideoIndex = 0;

    const videoPlayer = document.getElementById('videoPlayer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Adicione variáveis globais para rastrear o estado da pop-up
    let isAlbumPopupVisible = false;
    let isListPopupVisible = false;

    function playVideo(videoUrl) {
        const isVimeo = videoUrl.includes('vimeo');
        const isYouTube = videoUrl.includes('youtube');

        if (isVimeo) {
            const vimeoVideoId = getVimeoVideoId(videoUrl);
            videoPlayer.src = `https://player.vimeo.com/video/${vimeoVideoId}`;
        } else if (isYouTube) {
            const youTubeVideoId = getYouTubeVideoId(videoUrl);
            videoPlayer.src = `https://www.youtube.com/embed/${youTubeVideoId}`;
        }
    }

    function getVimeoVideoId(vimeoUrl) {
        return vimeoUrl.split('/').pop();
    }

    function getYouTubeVideoId(youTubeUrl) {
        const urlParams = new URLSearchParams(new URL(youTubeUrl).search);
        return urlParams.get('v');
    }

    function showAlbumPopup() {
        const albumPopup = document.getElementById('cxlista');
        
        // Verifica se a pop-up está visível e toogle o estado
        isAlbumPopupVisible = !isAlbumPopupVisible;

        // Define a propriedade de exibição com base no estado
        albumPopup.style.display = isAlbumPopupVisible ? 'flex' : 'none';

        if (isAlbumPopupVisible) {
            albumPopup.innerHTML = ""; // Limpa o conteúdo anterior

            // Adiciona um botão de fechar
            const closeButton = document.createElement('span');
            closeButton.innerText = 'x';
            closeButton.onclick = function () {
                closePopups();
            };
            albumPopup.appendChild(closeButton);

            // Lógica para preencher e exibir a pop-up do álbum
            albums[currentAlbumIndex].videos.forEach(videoUrl => {
                const videoThumbnail = document.createElement('img');
                videoThumbnail.src = getVideoThumbnail(videoUrl);
                videoThumbnail.alt = 'Video Thumbnail';
                videoThumbnail.onclick = function () {
                    playVideo(videoUrl);

                    // Adicione lógica para fechar a pop-up após o vídeo ser reproduzido
                    closePopups();
                };
                albumPopup.appendChild(videoThumbnail);
            });
        }
    }

    function showListPopup() {
        const listPopup = document.getElementById('cxalbum');
        
        // Verifica se a pop-up está visível e toogle o estado
        isListPopupVisible = !isListPopupVisible;

        // Define a propriedade de exibição com base no estado
        listPopup.style.display = isListPopupVisible ? 'flex' : 'none';

        if (isListPopupVisible) {
            listPopup.innerHTML = ""; // Limpa o conteúdo anterior

            // Adiciona um botão de fechar
            const closeButton = document.createElement('span');
            closeButton.innerText = 'x';
            closeButton.onclick = function () {
                closePopups();
            };
            listPopup.appendChild(closeButton);

           
            // Lógica para preencher e exibir a pop-up da lista
     albums.forEach((album, index) => {
    const albumButton = document.createElement('button');
    albumButton.innerText = album.name;

    if (album.cover) {
        // Adiciona a imagem de capa (cover) ao botão
        const coverImage = document.createElement('img');
        coverImage.src = album.cover;
        coverImage.alt = 'Album Cover';
        albumButton.appendChild(coverImage);
    } else if (album.videos.length > 0) {
        // Se não houver capa, e houver pelo menos um vídeo, adiciona o thumbnail do primeiro vídeo
        const videoThumbnail = document.createElement('img');
        videoThumbnail.src = getVideoThumbnail(album.videos[0]);
        videoThumbnail.alt = 'Video Thumbnail';
        albumButton.appendChild(videoThumbnail);
    }

    albumButton.onclick = function () {
        currentAlbumIndex = index;
        currentVideoIndex = 0;
        playVideo(album.videos[currentVideoIndex]);
        closePopups();
    };

    listPopup.appendChild(albumButton);
});

           // Função para obter o thumbnail de um vídeo
    function getVideoThumbnail(videoUrl) {
    if (videoUrl.includes('vimeo')) {
        const vimeoVideoId = getVimeoVideoId(videoUrl);
        return `https://vumbnail.com/${vimeoVideoId}.jpg`;
    } else if (videoUrl.includes('youtube')) {
        const youTubeVideoId = getYouTubeVideoId(videoUrl);
        return `https://img.youtube.com/vi/${youTubeVideoId}/0.jpg`;
    }
    return ''; // Retorna uma string vazia se não for Vimeo nem YouTube
}


        }
    }

    // Modificado para adicionar um evento de clique alternado para AlbumBtn
    AlbumBtn.addEventListener('click', function () {
        showAlbumPopup();
        // Certifica-se de que a outra pop-up está fechada ao abrir uma
        if (isListPopupVisible) {
            showListPopup();
        }
    });

    // Modificado para adicionar um evento de clique alternado para ListBtn
    ListBtn.addEventListener('click', function () {
        showListPopup();
        // Certifica-se de que a outra pop-up está fechada ao abrir uma
        if (isAlbumPopupVisible) {
            showAlbumPopup();
        }
    });

    function closePopups() {
        const albumPopup = document.getElementById('cxalbum');
        const listPopup = document.getElementById('cxlista');
        albumPopup.style.display = 'none';
        listPopup.style.display = 'none';
    }

    prevBtn.addEventListener('click', function () {
        currentVideoIndex = (currentVideoIndex - 1 + albums[currentAlbumIndex].videos.length) % albums[currentAlbumIndex].videos.length;
        playVideo(albums[currentAlbumIndex].videos[currentVideoIndex]);
    });

    nextBtn.addEventListener('click', function () {
        currentVideoIndex = (currentVideoIndex + 1) % albums[currentAlbumIndex].videos.length;
        playVideo(albums[currentAlbumIndex].videos[currentVideoIndex]);
    });

    // Inicialização do player com o primeiro vídeo do primeiro álbum
    playVideo(albums[currentAlbumIndex].videos[currentVideoIndex]);

    function getVideoThumbnail(videoUrl) {
        if (videoUrl.includes('vimeo')) {
            const vimeoVideoId = getVimeoVideoId(videoUrl);
            return `https://vumbnail.com/${vimeoVideoId}.jpg`;
        } else if (videoUrl.includes('youtube')) {
            const youTubeVideoId = getYouTubeVideoId(videoUrl);
            return `https://img.youtube.com/vi/${youTubeVideoId}/0.jpg`;
        }
        return ''; // Retorna uma string vazia se não for Vimeo nem YouTube
    }
});