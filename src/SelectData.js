import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";

export default function SelectData({
  setMonth,
  setDay,
  currentDay,
  currentMonth,
}) {
  const handleChangeDay = (e) => {
    const { value } = e.target;
    setDay(value);
  };
  const handleChangeMonth = (e) => {
    const { value } = e.target;
    setMonth(value);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Dzień</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={currentDay}
          onChange={handleChangeDay}
          label="Day"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {Array.from(Array(30).keys()).map((value, idx) => {
            return (
              <MenuItem value={value + 1} key={idx}>
                {value + 1}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Miesiąc</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={currentMonth}
          onChange={handleChangeMonth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Styczeń</MenuItem>
          <MenuItem value={2}>Luty</MenuItem>
          <MenuItem value={3}>Marzec</MenuItem>
          <MenuItem value={4}>Kwiecień</MenuItem>
          <MenuItem value={5}>Maj</MenuItem>
          <MenuItem value={6}>Czerwiec</MenuItem>
          <MenuItem value={7}>Lipiec</MenuItem>
          <MenuItem value={8}>Sierpień</MenuItem>
          <MenuItem value={9}>Wrzesien</MenuItem>
          <MenuItem value={10}>Pazdziernik</MenuItem>
          <MenuItem value={11}>Listopad</MenuItem>
          <MenuItem value={12}>Grudzień</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
SelectData.propTypes = {
  setMonth: PropTypes.func.isRequired,
  setDay: PropTypes.func.isRequired,
  currentDay: function (props, propName, component) {
    if (props[propName] <= 0) {
      return new Error(propName + " was too short");
    }
  },
  currentMonth: function (props, propName, component) {
    if (props[propName] <= 0) {
      return new Error(propName + " was too short");
    }
  },
};
