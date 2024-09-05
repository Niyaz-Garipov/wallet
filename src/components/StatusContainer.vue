<template>
  <main class="main">
    <nav class="main-dock">
      <span @click="displayIframe1()">app.uniswap.org</span>
      <span @click="displayIframe2()">app.1inch.io</span>
      <span @click="displayIframe3()">bugs.denet.pro</span>
      <span @click="displayIframe4()">revert.finance</span>
    </nav>

    <div class="main-title">WALLET</div>

    <div class="main-address">
      <span class="main-address__title">address:</span>
      {{ addressShow }}
    </div>

    <div class="main-sha256">
      <span class="main-sha256__title">sha256:</span>
      {{ textareaValueSha256 }}
    </div>

    <div class="main-iframes">
      <div class="main-iframes__title">iframes:</div>
      <div class="main-iframes__content">
        <div id="iframeDisplay1"></div>
        <div id="iframeDisplay2"></div>
        <div id="iframeDisplay3"></div>
        <div id="iframeDisplay4"></div>
      </div>
    </div>

    <div class="main-aesEncrypt">
      <span class="main-aesEncrypt__title">aes encrypt:</span>
      {{ encryptedText }}
    </div>

    <div class="main-aesDecrypt">
      <span class="main-aesDecrypt__title">aes decrypt:</span>
      {{ decryptedText }}
    </div>

    <div class="main-footer">
      <div class="main-button">
        <ConnectWalletButton
        :txnCount="txnCount"
        :address="address"
        :dark="false"
        @click="toggleConnected()"/>
      </div>

      <div class="main-sha256input">
        <textarea class="main-textarea" placeholder="some text..." id="textareaID"></textarea>
        <button class="main-textareaButton" @click="getSha256()">sha256</button>
      </div>

      <div class="main-aesinput">
        <textarea class="main-textarea" placeholder="aes..." id="textareaAesID"></textarea>
        <button class="main-textareaButton" @click="getAes()">aes encrypt</button>
        <button class="main-textareaButton" @click="getDescryptedAes()">aes decrypt</button>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useMetaMaskWallet, ConnectWalletButton } from 'vue-connect-wallet'

export default {
  name: 'StatusContainer',
  components: {
    ConnectWalletButton
  },
  props: {
  },
  setup () {
    const wallet = () => useMetaMaskWallet()
    const address = ref('')
    const txnCount = ref(1)
    const sha256 = require('js-sha256').sha256
    var CryptoJS = require('crypto-js')
    var textareaValueSha256 = ref('')
    var encryptedText = ref('')
    var decryptedText = ref('')

    const getSha256 = () => {
      textareaValueSha256.value = sha256(document.getElementById('textareaID').value)
    }

    const getAes = () => {
      encryptedText.value = CryptoJS.AES.encrypt(document.getElementById('textareaAesID').value, 'Secret key 123').toString()
    }

    const getDescryptedAes = () => {
      decryptedText.value = CryptoJS.AES.decrypt(encryptedText.value, 'Secret key 123').toString(CryptoJS.enc.Utf8)
    }

    const displayIframe1 = () => {
      document.getElementById('iframeDisplay1').innerHTML = '<iframe src="https://app.uniswap.org/" height="200" width="300"></iframe>'
    }

    const displayIframe2 = () => {
      document.getElementById('iframeDisplay2').innerHTML = '<iframe src="https://app.1inch.io/#/1/simple/swap/ETH" height="200" width="300"></iframe>'
    }

    const displayIframe3 = () => {
      document.getElementById('iframeDisplay3').innerHTML = '<iframe src="https://bugs.denet.pro/" height="200" width="300"></iframe>'
    }

    const displayIframe4 = () => {
      document.getElementById('iframeDisplay4').innerHTML = '<iframe src="https://revert.finance/" height="200" width="300"></iframe>'
    }

    const {
      connect,
      getAccounts,
      switchAccounts,
      onAccountsChanged,
      switchOrAddChain
    } = useMetaMaskWallet()

    async function toggleConnected () {
      if (address.value && address.value.length > 0) address.value = ''
      else address.value = '0xF31C77007bA225fb6eb13c51e6Ef234d7019Cb93'
      const result = await connect()
      console.log('result', result)
    }

    const addressShow = ref(address)

    return {
      wallet,
      toggleConnected,
      connect,
      getAccounts,
      switchAccounts,
      onAccountsChanged,
      switchOrAddChain,
      txnCount,
      addressShow,
      sha256,
      getSha256,
      textareaValueSha256,
      displayIframe1,
      displayIframe2,
      displayIframe3,
      displayIframe4,
      encryptedText,
      decryptedText,
      getAes,
      getDescryptedAes
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100vh;
    background-color: rgb(132, 0, 255);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: end;

    &-aesEncrypt {
      position: absolute;
      top: 20%;
      left: 15%;
      color: #FFFFFF;
      font-family: 'Montserrat';
      font-weight: 500;
      font-size: 13px;
      display: flex;
      flex-direction: column;
      align-items: baseline;
      justify-content: center;
      gap: 10px;

      &__title {
        padding: 10px 10px 10px 10px;
        background-color: #407df8;
        border-radius: 10px;
      }
    }

    &-aesDecrypt {
      position: absolute;
      top: 20%;
      right: 15%;
      color: #FFFFFF;
      font-family: 'Montserrat';
      font-weight: 500;
      font-size: 13px;
      display: flex;
      flex-direction: column;
      align-items: end;
      justify-content: center;
      gap: 10px;

      &__title {
        padding: 10px 10px 10px 10px;
        background-color: #407df8;
        border-radius: 10px;
      }
    }

    &-iframes {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 49%;
      gap: 5px;

      &__title {
        padding: 10px 10px 10px 10px;
        background-color: #407df8;
        border-radius: 10px;
        color: #FFFFFF;
        font-family: 'Montserrat';
        font-weight: 500;
        font-size: 13px;
      }

      &__content {
        display: flex;
        gap: 10px;
      }
    }

    &-dock {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      position: absolute;
      top: 0px;
      height: 50px;
      width: 100%;
      background-color: #407df8;
      color: #FFFFFF;
      font-family: 'Montserrat';
      font-weight: 500;
      font-size: 13px;
    }

    &-footer {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 20px;
    }

    &-title {
      color: #FFFFFF;
      font-family: 'Montserrat';
      font-weight: 900;
      font-size: 60px;
      position: absolute;
      top: 15%;
    }

    &-button {
      margin-bottom: 20px;
    }

    &-textarea {
      width: 300px;
      height: 50px;
      margin-bottom: 10px;
    }

    &-textareaButton {
      background-color: #407df8;
      border: none;
      color: #FFFFFF;
      font-family: 'Montserrat';
      font-weight: 500;
      font-size: 13px;
      border-radius: 10px;
      padding: 5px 0px 5px 0px;
      margin-bottom: 5px;
    }

    &-sha256input {
      display: flex;
      flex-direction: column;
    }

    &-aesinput {
      display: flex;
      flex-direction: column;
    }

    &-sha256 {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      position: absolute;
      top: 40%;
      color: #FFFFFF;
      font-family: 'Montserrat';
      font-weight: 500;
      font-size: 13px;

      &__title {
        padding: 10px 10px 10px 10px;
        background-color: #407df8;
        border-radius: 10px;
      }
    }

    &-address {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      position: absolute;
      top: 30%;
      color: #FFFFFF;
      font-family: 'Montserrat';
      font-weight: 500;
      font-size: 13px;

      &__title {
        padding: 10px 10px 10px 10px;
        background-color: #407df8;
        border-radius: 10px;
      }
    }
  }
</style>
