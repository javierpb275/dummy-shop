import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
//import {useTranslation} from "next-i18next"

export default function SelectLanguage() {
  const router = useRouter();
  //const {t} = useTranslation("common")
  const t = (t: string) => t;
  return (
    <div>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 120, color: "white" }}
      >
        <InputLabel
          sx={{ color: "white" }}
          id="demo-simple-select-standard-label"
        >
          Language
        </InputLabel>
        <Select
          sx={{ color: "white" }}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={router.locale}
          onChange={(event) => {
            router.push(router.pathname, router.asPath, {
              locale: event.target.value,
            });
          }}
          label="Language"
        >
          <MenuItem color="white" value="en">
            {t("english")}
          </MenuItem>
          <MenuItem color="white" value="es">
            {t("spanish")}
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
