<template>
  <table align="center" style="width:100%">
    <thead>
      <tr>
        <th>Name</th>
        <th>Climate</th>
        <th>Diameter</th>
        <th>Gravity</th>
        <th>Orbital Period</th>
        <th>Population</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tracks" :key="item.name">
        <td>
          {{ item.album.name }}
        </td>
        <td>
          {{ item.album.popularity }}
        </td>
        <td>
          <img :src="item.album.images[0].url">
        </td>
        <td>
          {{ item.album.label }}
        </td>
        <td>
          {{ item.album.release_date }}
        </td>
        <td>
          {{ item.album.release_date_precision }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'Tracks',
  props: {
    tracks: Array
  }
}

</script>
