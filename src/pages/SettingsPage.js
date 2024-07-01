	
import { Page, Navbar, List, ListInput, Range, f7, f7ready } from "framework7-react";
import { useState, useEffect } from "react";

const SettingPage = () => {
  const [temperature, setTemperature] = useState(0.7);

  useEffect(() => {
    f7ready(() => {
      // read from local storage
      const temperature = JSON.parse(localStorage.getItem("temperature"));
      if (temperature) setTemperature(temperature);
    });
  }, []);
 
  useEffect(() => {
    localStorage.setItem("temperature", JSON.stringify(temperature));
  });

  return (
    <>
      <Page>
        <Navbar title="Settings" backLink="Back"></Navbar>
        <List strongIos dividersIos insetIos>
          <ListInput label={`Temperature (${temperature})`} input={false}>
            <Range
              slot="input"
              value={temperature}
              onRangeChanged={(value) => {
                setTemperature(+value.toFixed(1));
              }}
              min={0.1}
              max={2}
              step={0.1}
            />
          </ListInput>
        </List>
      </Page>
    </>
  );
};

export default SettingPage;
