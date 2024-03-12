- Install npm (Node.js Package Manager)

- npm install -g typescript

- Compile ts to js: https://code.visualstudio.com/docs/typescript/typescript-compiling

- Fix 系統上已停用指令碼執行... issue
  - https://hackercat.org/windows/powershell-cannot-be-loaded-because-the-execution-of-scripts-is-disabled-on-this-system
  - Login as admin
  - terminal >  Get-ExecutionPolicy
    - default is: Restricted
  - termianl >  Set-ExecutionPolicy RemoteSigned

- To fix cors problem on browser, you need a web server
   - Install Live Server in VS code plugin
   - Run Live server on bottom right of VS code