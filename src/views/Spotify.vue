<template>
  <div class="spotify">
    <h1>Top Albums</h1>
    <button v-on:click="authenticate()" v-if="!accessToken">Authenticate with Spotify</button>
    <div class="loading" v-if="loading">Loading...</div>
    <User v-bind:user="user"/>
    <Tracks v-bind:tracks="tracks"/>
    <div v-if="errors">
      <ul>
        <li>
          Error retreaving data from Spotify API
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

import Tracks from '@/components/Tracks.vue'
import User from '@/components/User.vue'

export default {
  name: 'spotify',
  components: {
    Tracks,
    User
  },
  data () {
    return {
      accessToken: '',
      tokenType: '',
      authState: '',
      tracks: null,
      user: null,
      errors: null,
      loading: false
    }
  },
  methods: {
    authenticate: function () {
      let clientID = 'b38b7b87585f4737bca84a71e7176e89'
      let spotifyAuthUrl = 'https://accounts.spotify.com/authorize/?client_id=' + clientID + '&redirect_uri=http%3A%2F%2Flocalhost:8080&scope=playlist-read-private%20user-library-modify%20playlist-read-collaborative%20playlist-modify-private%20user-read-currently-playing%20user-read-email%20user-read-private%20user-read-birthdate%20user-library-read%20user-top-read%20playlist-modify-public%20user-follow-read%20user-read-playback-state%20user-modify-playback-state%20user-follow-modify%20user-read-recently-played&response_type=token&state=123'
      window.location.replace(spotifyAuthUrl)
    },
    parseHash(hash) {
      let hashValues = {}
      let hashString = hash.substring(1, hash.length)
      hashString.split('&').forEach(function(query) {
        let prop = query.split("=")[0]
        let val = query.split("=")[1]
        if (typeof prop !== 'undefined' && typeof val !== 'undefined') {
          hashValues[prop] = val
        }
      })
      return hashValues;
    },
    getAuthCode: function () {
      this.accessToken = localStorage.getItem('access-token')
    },
    setAuthCode(accessToken, tokenType, state) {
      this.accessToken = localStorage.setItem('access-token', accessToken)
      this.tokenType = localStorage.setItem('token-type', tokenType)
      this.authState = localStorage.setItem('auth-state', state)
    },
    removeAuthCode() {
      localStorage.clear()
    },
    getUser: function () {
      axios.get('https://api.spotify.com/v1/me/', {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      })
      .then(response => {
        this.user = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    getTopTracks: function () {
      axios.get('https://api.spotify.com/v1/me/albums', {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      })
      .then(response => {
        this.tracks = response.data.items
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    passAuthCallback: function () {
      if (window.location.hash !== '') {
        this.loading = true
        let hash = location.hash
        let callbackValues = this.parseHash(hash)
        let accessToken = callbackValues.access_token
        let tokenType = callbackValues.token_type
        let state = callbackValues.state
        this.setAuthCode(accessToken, tokenType, state)
        this.getAuthCode()
        this.getUser()
        this.getTopTracks()
        this.loading = false
      }
    }
  },
  beforeMount(){
    this.passAuthCallback()
  }
}

</script>
