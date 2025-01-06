import { useEffect, useState } from "react";

function Campaign() {
  const [searchType, setSearchType] = useState("all");
  const [searchFilter, setSearchFilter] = useState({});

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState({});

  const handleChecked = (id) => {
    const findChecked = id in selectedDoctors;

    if (findChecked) {
      const endSelectedDoctors = selectedDoctors.filter(
        (doctorsId) => id !== doctorsId,
      );
      setSelectedDoctors(endSelectedDoctors);
    } else {
      setSelectedDoctors({ ...setSelectedDoctors, id: true });
    }
    return findChecked;
  };

  const handleSelectDoctors = () => {
    if (searchType === "all") {
    } else {
      setSelectedDoctors();
    }
  };

  useEffect(() => {}, []);

  return <div className="campaign-container">Campaign</div>;
}
