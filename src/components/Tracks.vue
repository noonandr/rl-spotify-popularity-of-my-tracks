<template>
  <div class="album-list">
    <div class="album" v-for="item in tracks" :key="item.name">
      <div class="album-art">
        <img class="album-art-image" :src="item.album.images[1].url">
      </div>
      <div class="data-area">
        <div class="data-item name">
          <span class="label">Album Title: </span><span class="value">{{ item.album.name }}</span>
        </div>
        <div class="data-item popularity">
          <span class="label">Popularity: </span><span class="value">{{ item.album.popularity }}</span>
        </div>
        <div class="data-item album-label">
          <span class="label">Label: </span><span class="value">{{ item.album.label }}</span>
        </div>
        <div class="data-item release-date">
          <span class="label">Release Date: </span><span class="value">{{ item.album.release_date }}</span>
        </div>
        <div class="data-item release-date-precision">
          <span class="label">Copyright: </span>
          <ul>
            <li v-for="copyright in item.album.copyrights"  :key="copyright.id" class="copyright-text">{{ copyright.text }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Tracks',
  props: {
    tracks: Array
  }
}

</script>

<style>

.album-list {
  padding: 8px;
  background: #FFFFFF;

  @media (min-width: 480px) {
    padding: 8px 12px;
  }
}

.album {
  display: flex;
  padding: 8px;
  display: flex;
  border-bottom: 2px solid #F5F5F5;

  @media (min-width: 480px) {
    padding: 18px 8px;
  }
}

.album-art {
  flex: 0 0 140px;
}

.album-art-image {
  width: 120px;
}

.data-area {
  flex: 1 1 auto;
}

.data-item {
  text-align: right;
}

.label {
  margin: 0;
  padding: 0 10px;
  float:left;
  color: #8C8C8C;
  font-size: 14px;
  font-weight: 200;
}

.copyright-text {
  list-style: none;
}

</style>
