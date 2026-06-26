!macro customHeader
  ManifestDPIAware true
!macroend

!macro customUnInstall
  ${ifNot} ${isUpdated}
    StrCpy $0 "$PROFILE\.cache\apple-intelligence\models"
    IfFileExists "$0\*.*" 0 +3
      RMDir /r "$0"
      DetailPrint "Removed Apple Intelligence cached models"
    StrCpy $1 "$PROFILE\.cache\apple-intelligence"
    RMDir "$1"
  ${endIf}
!macroend
