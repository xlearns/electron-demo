!macro customInstall
   SetRegView 64
   WriteRegStr HKCR "*\shell\Ddsc" "" "electron test"
   WriteRegStr HKCR "*\shell\Ddsc" "Icon" "$INSTDIR\electron.exe"
   WriteRegStr HKCR "*\shell\Ddsc\command" "" '"$INSTDIR\electron.exe" "upload" "%1"'
   SetRegView 32
   WriteRegStr HKCR "*\shell\Ddsc" "" "electron test"
   WriteRegStr HKCR "*\shell\Ddsc" "Icon" "$INSTDIR\electron.exe"
   WriteRegStr HKCR "*\shell\Ddsc\command" "" '"$INSTDIR\electron.exe" "upload" "%1"'
!macroend
!macro customUninstall
   DeleteRegKey HKCR "*\shell\Ddsc"
!macroend
