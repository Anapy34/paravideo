document.addEventListener('DOMContentLoaded', function () {
    const albums = [
        {
            name: 'Album 1',
            cover: 'https://img.youtube.com/vi/QnCs2nsZGRk/mqdefault.jpg',
            videos: [
                'https://www.youtube.com/embed/QnCs2nsZGRk',
                'https://www.youtube.com/embed/gMcbiuNYnQY'
            ]
        },
        {
            name: 'Album 2',
            cover: '',
            videos: [
              'https://player.vimeo.com/video/384878999',
               'https://player.vimeo.com/video/307791576',
              'https://player.vimeo.com/video/378788675',
		'https://vimeo.com/345036555',
              'https://vimeo.com/306676681',
                
            ]
        },
        {
            name: 'Album 3',
            cover: 'https://i3.ytimg.com/vi/v3SQTOZO36E/hqdefault.jpg',
            videos: [
                     'https://www.youtube.com/embed/v3SQTOZO36E',
                     'https://www.youtube.com/embed/Zdh2hot8rjU',
                     'https://www.youtube.com/embed/GXk9e1K52L4'
                    ]
        },
       {
            name: 'Album 4',
            cover: 'https://cdn-icons-png.flaticon.com/512/7405/7405885.png',
        videos: [
                 'https://www.xvideos.com/embedframe/74149425',
                 'https://www.pornhub.com/embed/ph63286e3a24438',
                 'https://br.xhamster.com/embed/xhLcoji',
		 'https://br.xhamster.com/embed/xhpVPMp',
           
		   ]     
        },
    ];

    let currentAlbumIndex = 0;
    let currentVideoIndex = 0;

    function showVideo(albumIndex, videoIndex) {
        const videoSrc = albums[albumIndex].videos[videoIndex];
        document.getElementById('player').innerHTML = `<iframe width="100%" height="100%" src="${videoSrc}" frameborder="0" allowfullscreen></iframe>`;
    }

    function CxLista(cxlista) {
        document.getElementById('cxlista').innerHTML = cxlista;
        document.getElementById('cxalbum').style.display = 'none';
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('cxlista').style.display = 'flex';
    }

    function CxAlbum(cxalbum) {
        document.getElementById('cxalbum').innerHTML = cxalbum;
        document.getElementById('cxlista').style.display = 'none';
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('cxalbum').style.display = 'flex';
    }

    function hidePopup() {
        document.getElementById('overlay').style.display = 'none';
    }

function showAlbumList() {
    const defaultThumbnail = 'https://cdn-icons-png.flaticon.com/512/4173/4173686.png';

    const albumListContent = albums.map((album, index) => {
        const cover = album.cover || getVideoThumbnail(album.videos[0]) || defaultThumbnail;
        return `<img src="${cover}" alt="${album.name}" width="120" height="100" data-index="${index}">`;
    }).join('');

    CxAlbum(albumListContent);
}

function showVideoList(albumIndex) {
    const defaultThumbnail = 'https://cdn-icons-png.flaticon.com/512/4173/4173686.png';

    const videos = albums[albumIndex].videos;
    const videoListContent = videos.map((video, index) => {
        const thumbnail = getVideoThumbnail(video) || defaultThumbnail;
        return `
            <div class="listavideo">
                <div class="video-item" data-index="${index}">
                    <img src="${thumbnail}" alt="Video Thumbnail" width="70" height="60">              
                </div>
            </div>
        `;
    }).join('');

    CxLista(videoListContent);

    // Adiciona evento de clique para iniciar o vídeo ao clicar na imagem
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach((item) => {
        item.addEventListener('click', function () {
            currentVideoIndex = parseInt(this.dataset.index);
            showVideo(currentAlbumIndex, currentVideoIndex);
            hidePopup();
        });
    });
}


    // Função para obter a miniatura do vídeo (adaptação do seu exemplo)
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

    // Função para obter o ID do vídeo do Vimeo
    function getVimeoVideoId(videoUrl) {
        const regex = /https:\/\/player\.vimeo\.com\/video\/([0-9]+)/;
        const match = videoUrl.match(regex);
        return match ? match[1] : null;
    }

    // Função fictícia para obter o ID do vídeo do YouTube
    function getYouTubeVideoId(videoUrl) {
        const regex = /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = videoUrl.match(regex);
        return match ? match[1] : null;
    }

    document.getElementById('prevBtn').addEventListener('click', function () {
        currentVideoIndex = (currentVideoIndex - 1 + albums[currentAlbumIndex].videos.length) % albums[currentAlbumIndex].videos.length;
        showVideo(currentAlbumIndex, currentVideoIndex);
    });

    document.getElementById('nextBtn').addEventListener('click', function () {
        currentVideoIndex = (currentVideoIndex + 1) % albums[currentAlbumIndex].videos.length;
        showVideo(currentAlbumIndex, currentVideoIndex);
    });

    document.getElementById('toggleAlbumBtn').addEventListener('click', function () {
        showAlbumList();
    });

    document.addEventListener('click', function (event) {
        if (event.target && event.target.dataset && event.target.dataset.index) {
            const index = parseInt(event.target.dataset.index);
            currentAlbumIndex = index;
            currentVideoIndex = 0;
            showVideo(currentAlbumIndex, currentVideoIndex);
            hidePopup();
        }
    });

    document.getElementById('toggleListBtn').addEventListener('click', function () {
        showVideoList(currentAlbumIndex);
    });

    document.getElementById('closeBtn').addEventListener('click', function () {
        hidePopup();
    });

    // Exibição inicial do vídeo
    showVideo(currentAlbumIndex, currentVideoIndex);
});
