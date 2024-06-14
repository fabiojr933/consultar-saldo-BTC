
  // APIKEY: 'H7H5J7BdmxkpuMDoF8t8GloaXKcnqziehNsSWIW2iTtB6D8xuOt3p1DkQQiz116X',
  // APISECRET: '0XOZs7VncUiJRyMd40JIvPuRdX0UUU2z4IEuQ3c20BJnDpCZqcLNvCrqqorV1tqX',


  const axios = require('axios');
  const CryptoJS = require('crypto-js');
  
  const apiKey = 'H7H5J7BdmxkpuMDoF8t8GloaXKcnqziehNsSWIW2iTtB6D8xuOt3p1DkQQiz116X';
  const apiSecret = '0XOZs7VncUiJRyMd40JIvPuRdX0UUU2z4IEuQ3c20BJnDpCZqcLNvCrqqorV1tqX';
  const baseUrl = 'https://testnet.binance.vision/api/v3';
  
  async function getAccountInfo() {
    const timestamp = Date.now();
    const queryString = `timestamp=${timestamp}`;
    const signature = CryptoJS.HmacSHA256(queryString, apiSecret).toString(CryptoJS.enc.Hex);
  
    try {
      const response = await axios.get(`${baseUrl}/account`, {
        headers: {
          'X-MBX-APIKEY': apiKey
        },
        params: {
          timestamp,
          signature
        }
      });
  
      const balances = response.data.balances;
      const btcBalance = balances.find(b => b.asset === 'BTC');
      console.log('Saldo de BTC:', btcBalance.free);
    } catch (error) {
      console.error('Erro ao buscar o saldo:', error.response.data);
    }
  }
  
  getAccountInfo();
  