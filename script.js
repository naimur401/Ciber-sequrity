 // Playfair Cipher Functions

// Generate the Playfair cipher matrix
function generateMatrix(key) {
    let matrix = [];
    let charsAdded = {};
  
    // Function to add a unique character to the matrix
    const addCharToMatrix = (char) => {
      if (!charsAdded[char]) {
        matrix.push(char);
        charsAdded[char] = true;
      }
    };
  
    // Build the matrix
    for (let i = 0; i < key.length; i++) {
      addCharToMatrix(key[i].toUpperCase());
    }
  
    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(65 + i);
      if (char !== 'J') {
        addCharToMatrix(char);
      }
    }
  
    return matrix;
  }
  
  // Encrypt plain text using Playfair Cipher
  function encryptPlayfair(plainText, key) {
    const matrix = generateMatrix(key);
    const sanitizedText = plainText.toUpperCase().replace(/[^A-Z]/g, '');
    let encryptedText = '';
  
    for (let i = 0; i < sanitizedText.length; i += 2) {
      const char1 = sanitizedText[i];
      const char2 = sanitizedText[i + 1] || 'X';
  
      const index1 = matrix.indexOf(char1);
      const index2 = matrix.indexOf(char2);
  
      let encryptedChar1 = '';
      let encryptedChar2 = '';
  
      const row1 = Math.floor(index1 / 5);
      const col1 = index1 % 5;
  
      const row2 = Math.floor(index2 / 5);
      const col2 = index2 % 5;
  
      if (row1 === row2) {
        // Same row, shift columns
        encryptedChar1 = matrix[row1 * 5 + (col1 + 1) % 5];
        encryptedChar2 = matrix[row2 * 5 + (col2 + 1) % 5];
      } else if (col1 === col2) {
        // Same column, shift rows
        encryptedChar1 = matrix[((row1 + 1) % 5) * 5 + col1];
        encryptedChar2 = matrix[((row2 + 1) % 5) * 5 + col2];
      } else {
        // Rectangle rule
        encryptedChar1 = matrix[row1 * 5 + col2];
        encryptedChar2 = matrix[row2 * 5 + col1];
      }
  
      encryptedText += encryptedChar1 + encryptedChar2;
    }
  
    return encryptedText;
  }
  
  // Decrypt Playfair Cipher encrypted text
  function decryptPlayfair(encryptedText, key) {
    const matrix = generateMatrix(key);
    const sanitizedText = encryptedText.toUpperCase().replace(/[^A-Z]/g, '');
    let decryptedText = '';
  
    for (let i = 0; i < sanitizedText.length; i += 2) {
      const char1 = sanitizedText[i];
      const char2 = sanitizedText[i + 1] || 'X';
  
      const index1 = matrix.indexOf(char1);
      const index2 = matrix.indexOf(char2);
  
      let decryptedChar1 = '';
      let decryptedChar2 = '';
  
      const row1 = Math.floor(index1 / 5);
      const col1 = index1 % 5;
  
      const row2 = Math.floor(index2 / 5);
      const col2 = index2 % 5;
  
      if (row1 === row2) {
        // Same row, shift columns
        decryptedChar1 = matrix[row1 * 5 + (col1 - 1 + 5) % 5];
        decryptedChar2 = matrix[row2 * 5 + (col2 - 1 + 5) % 5];
      } else if (col1 === col2) {
        // Same column, shift rows
        decryptedChar1 = matrix[((row1 - 1 + 5) % 5) * 5 + col1];
        decryptedChar2 = matrix[((row2 - 1 + 5) % 5) * 5 + col2];
      } else {
        // Rectangle rule
        decryptedChar1 = matrix[row1 * 5 + col2];
        decryptedChar2 = matrix[row2 * 5 + col1];
      }
    
      decryptedText += decryptedChar1 + decryptedChar2;
    }
    
    return decryptedText;
    }
    
    // Vigenere Cipher Functions
    
    // Encrypt plain text using Vigenere Cipher
    function encryptVigenere(plainText, key) {
      const sanitizedText = plainText.toUpperCase().replace(/[^A-Z]/g, '');
      const sanitizedKey = key.toUpperCase().replace(/[^A-Z]/g, '');
      let encryptedText = '';
    
      for (let i = 0; i < sanitizedText.length; i++) {
        const char = sanitizedText[i];
        const keyChar = sanitizedKey[i % sanitizedKey.length];
        const charCode = ((char.charCodeAt(0) - 65) + (keyChar.charCodeAt(0) - 65)) % 26;
        const encryptedChar = String.fromCharCode(charCode + 65);
        encryptedText += encryptedChar;
      }
    
      return encryptedText;
    }
    
    // Decrypt Vigenere Cipher encrypted text
    function decryptVigenere(encryptedText, key) {
      const sanitizedText = encryptedText.toUpperCase().replace(/[^A-Z]/g, '');
      const sanitizedKey = key.toUpperCase().replace(/[^A-Z]/g, '');
      let decryptedText = '';
    
      for (let i = 0; i < sanitizedText.length; i++) {
        const char = sanitizedText[i];
        const keyChar = sanitizedKey[i % sanitizedKey.length];
        const charCode = ((char.charCodeAt(0) - 65) - (keyChar.charCodeAt(0) - 65) + 26) % 26;
        const decryptedChar = String.fromCharCode(charCode + 65);
        decryptedText += decryptedChar;
      }
    
      return decryptedText;
    }
    
    // Main Function
    
    document.addEventListener('DOMContentLoaded', () => {
        const cipherSelect = document.getElementById('cipher-select');
        const cipherKeyInput = document.getElementById('cipher-key');
        const plainText = document.getElementById('plain');
        const encryptedText = document.getElementById('encrypted');
        const decryptedText = document.getElementById('decrypted');
      
        // Update the encryption/decryption based on cipher selection
        cipherSelect.addEventListener('change', () => {
          const selectedCipher = cipherSelect.value;
          plainText.value = '';
          encryptedText.value = '';
          decryptedText.value = '';
      
          // Update placeholder based on selected cipher
          if (selectedCipher === 'playfair') {
            cipherKeyInput.placeholder = 'Enter Playfair Cipher Key';
          } else if (selectedCipher === 'vigenere') {
            cipherKeyInput.placeholder = 'Enter Vigenere Cipher Key';
          }
        });
      
        // Encrypt button click event
        document.getElementById('encrypt').addEventListener('click', () => {
          const selectedCipher = cipherSelect.value;
          const key = cipherKeyInput.value;
          const textToEncrypt = plainText.value;
      
          let encryptedResult = '';
          if (selectedCipher === 'playfair') {
            encryptedResult = encryptPlayfair(textToEncrypt, key);
          } else if (selectedCipher === 'vigenere') {
            encryptedResult = encryptVigenere(textToEncrypt, key);
          }
      
          encryptedText.value = encryptedResult;
        });
      
        // Decrypt button click event
        document.getElementById('decrypt').addEventListener('click', () => {
          const selectedCipher = cipherSelect.value;
          const key = cipherKeyInput.value;
          const textToDecrypt = encryptedText.value;
      
          let decryptedResult = '';
      
          if (selectedCipher === 'playfair') {
            decryptedResult = decryptPlayfair(textToDecrypt, key);
          } else if (selectedCipher === 'vigenere') {
            decryptedResult = decryptVigenere(textToDecrypt, key);
          }
      
          decryptedText.value = decryptedResult;
        });
      
        // Reset button click event
        document.getElementById('reset').addEventListener('click', () => {
          plainText.value = '';
          encryptedText.value = '';
          decryptedText.value = '';
          cipherKeyInput.value = '';
          cipherSelect.selectedIndex = 0;
        });
      });