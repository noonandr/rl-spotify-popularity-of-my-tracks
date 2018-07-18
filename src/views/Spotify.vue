<template>
  <div class="spotify">
    <h1 class="page-title">Top Albums</h1>
    <button v-on:click="authenticate()" v-if="!accessToken || errors">Authenticate with Spotify</button>
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

<style>

body {
  background: #f5f5f5;
  font-family: Helvetica, Arial, Sans-Serif;
  color: #1c242b;
}

.page-title {
  padding-top: 20px;
  font-size: 32px;
}

html {
    overflow-x: hidden;
    height: 100%;
    margin: 0 auto;
    font-size: 100%;
    box-sizing: border-box;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
}

* {
    box-sizing: inherit;

    ::before,
    ::after {
        box-sizing: inherit;
    }
}


// -- body

body {
    overflow: show; // bricks reset legacy  (@todo investigate dropping this)
    position: relative; // bricks reset legacy  (@todo investigate dropping this)
    margin: 0;
    font: 16px/1 sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
}

// -- typography

h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
figure,
ol,
dl,
dt,
dd,
ul {
    margin: 0;
    padding: 0;
}

main {
    display: block;
}

ul,
ol {
    display: block;
    list-style-type: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: inherit;
}

a {
    text-decoration: none;

    &:hover,
    &:active {
        outline: 0;
    }
}

input,
textarea,
keygen,
select,
button {
    overflow: hidden;
    font: inherit;
    font-family: inherit;
    letter-spacing: inherit;
    -webkit-font-smoothing: inherit;
}

button  {
    vertical-align: middle;
    border: 0;
    border-style: solid;
    -webkit-appearance: button;
}

select {
    overflow: auto;
    border-radius: 0;
}

input {

    &[type="button"],
    &[type="reset"],
    &[type="submit"] {
        vertical-align: middle;
        border: 0;
        border-style: solid;
        -webkit-appearance: button;
    }

    &[type="number"] {
        -moz-appearance: textfield;

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
            margin: 0;
            -webkit-appearance: none;
        }
    }
}

:focus {
    outline: 0;
}


img {
    overflow-x: hidden;
    vertical-align: middle;
    max-width: 100%;
    height: auto;
    border: 0;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

</style>

