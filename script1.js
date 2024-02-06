      const inputEl = document.querySelector("#password")
      const upperCaseCheckEl = document.querySelector("#uppercase-check")
      const numberCheckEl = document.querySelector("#number-check")
      const symbolCheckEl = document.querySelector("#symbol-check")
      const securityIndicatorBar = document.querySelector('#security-indicator-bar')

      let passwordLength = 16



      function generatePassword() {
        let chars = "abcdefghjkmnpqrstuvwxyz"

        const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
        const numberChars = "123456789"
        const symbolChars = "?!@&*()[]"

        if (upperCaseCheckEl.checked) {
          chars += upperCaseChars
        }

        if (numberCheckEl.checked) {
          chars += numberChars
        }

        if (symbolCheckEl.checked) {
          chars += symbolChars
        }

        let password = ""

        for (let i = 0; i < passwordLength; i++) {
          const randomNumber = Math.floor(Math.random() * chars.length)
          password += chars.substring(randomNumber, randomNumber + 1)
        }

        inputEl.value = password
        calclateQuality()
        calculateFontSize()
      }

      function calclateQuality(){  //funçao da barra de qualidade de segurança 
        
        const percent = Math.round((passwordLength / 64) * 25 + (upperCaseCheckEl.checked ? 15 : 0)
        + (numberCheckEl.checked ? 25 : 0) + (symbolCheckEl.checked ? 35 : 0)) //primeiro criamos o percentual da barra atribuindo valores de acordo com os tipo de caracteres presentes
        // console.log(percent)
        securityIndicatorBar.style.width = `${percent}%` //depois demos estilo a ela atraves do JS 

        if(percent > 69){
            securityIndicatorBar.classList.remove('critical')
            securityIndicatorBar.classList.remove('warning')
            securityIndicatorBar.classList.add('safe')
        }else if(percent > 50){
            securityIndicatorBar.classList.remove('critical')
            securityIndicatorBar.classList.add('warning')
            securityIndicatorBar.classList.remove('safe')
        }else{
            securityIndicatorBar.classList.add('critical')
            securityIndicatorBar.classList.remove('warning')
            securityIndicatorBar.classList.remove('safe')
        }
        if(percent >= 100){
            securityIndicatorBar.classList.add('completed')
        }else{
            securityIndicatorBar.classList.remove('completed')
        }
      } 
      function calculateFontSize(){
        if(passwordLength > 45){
            inputEl.classList.remove('font-sm')
            inputEl.classList.remove('font-xs')
            inputEl.classList.add('font-xxs')
        }else if(passwordLength > 32){
            inputEl.classList.remove('font-sm')
            inputEl.classList.add('font-xs')
            inputEl.classList.remove('font-xxs')
        }else if(passwordLength > 22){
            inputEl.classList.add('font-sm')
            inputEl.classList.remove('font-xs')
            inputEl.classList.remove('font-xxs')
        }else{
            inputEl.classList.remove('font-sm')
            inputEl.classList.remove('font-xs')
            inputEl.classList.remove('font-xxs')
        }
      }

      function copy() {
        navigator.clipboard.writeText(inputEl.value)
      }

      const passwordLengthEl = document.querySelector("#password-length")
      passwordLengthEl.addEventListener("input", function () {
        passwordLength = passwordLengthEl.value
        document.querySelector('#password-length-text').innerText = passwordLength
        generatePassword()
      })
      upperCaseCheckEl.addEventListener("click", generatePassword)
      numberCheckEl.addEventListener("click", generatePassword)
      symbolCheckEl.addEventListener("click", generatePassword)
      document.querySelector("#renew").addEventListener('click', generatePassword)

      document.querySelector("#copy-1").addEventListener("click", copy)
      document.querySelector("#copy-2").addEventListener("click", copy)
      
      generatePassword()