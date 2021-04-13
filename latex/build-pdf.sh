RED=`tput setaf 1`
GREEN=`tput setaf 2`
BOLD=$(tput bold)
RESET=`tput sgr0`

if make --always-make; then
  echo "${GREEN}${BOLD}Pdf successfully generated!${RESET}"
else
  echo "${RED}${BOLD}Pdf generation failed!${RESET}"
fi
