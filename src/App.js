import "./App.css";
import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

//import UseScript from "hooks/useScript";

import { useState } from "react";

export default function App() {
  const [symptoms, setSymptoms] = useState([]);
  const [meds, setMeds] = useState([]);
  const [input, setInput] = useState("");
  const [input1, setInput1] = useState("");
  let [fieldLookUp, setFieldLookUp] = useState(new Map());

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleChange1 = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  useEffect(() => {
    const apiUrl = `https://clinicaltables.nlm.nih.gov/fhir/R4/ValueSet/icd10cm/$expand?_format=json&count=5&filter=${input}`;
    //https://clinicaltables.nlm.nih.gov/fhir/R4/ValueSet/RxTerms/$expand?_format=json
    fetch(apiUrl)
      .then((res) => res.json())
      .then((symptoms) => {
        console.log(JSON.stringify(symptoms, null, 2));

        const {
          expansion: { contains },
        } = symptoms;
        // let fields = new Map();
        // symptoms.forEach((element) => {
        //   symptoms.set(element.code, element.display);
        // });
        // setFieldLookUp(fields);

        setSymptoms(contains);
        //  setSymptoms(symptoms);
        // console.log(symptoms);
      });
  }, [input]);

  useEffect(() => {
    const apiUrl = `https://clinicaltables.nlm.nih.gov/fhir/R4/ValueSet/RxTerms/$expand?_format=json&filter=${input1}`;
    //https://clinicaltables.nlm.nih.gov/fhir/R4/ValueSet/RxTerms/$expand?_format=json
    fetch(apiUrl)
      .then((res) => res.json())
      .then((meds) => {
        console.log(JSON.stringify(meds, null, 2));
        const {
          expansion: { contains },
        } = meds;
        setMeds(contains);
      });
  }, [input1]);

  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        id={symptoms.map((o) => o.code)}
        disableClearable
        options={symptoms.map((option) => option.display)}
        renderInput={(params) => {
          // let fieldType = fieldLookUp.get(symptoms);
          // console.log(fieldType);
          return (
            <TextField
              {...params}
              label="Search input"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: "search" }}
              onChange={handleChange}
            />
          );
        }}
      />

      <Autocomplete
        id={"2"}
        disableClearable
        options={meds.map((o) => o.display)}
        renderInput={(params) => {
          // let fieldType = fieldLookUp.get(symptoms);
          // console.log(fieldType);
          return (
            <TextField
              {...params}
              label="Search Medications"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: "search" }}
              onChange={handleChange1}
            />
          );
        }}
      />
    </div>
  );
}
