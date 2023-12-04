const DoctorCard = ({ name, designation, specialty, visitingHours }) => {
  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{designation}</p>
        <p>{specialty}</p>
        <p>Visiting Hours:</p>
        <ul className="list-disc list-inside">
           {visitingHours.map((time, index) => (
             <li key={index}>{time}</li>
           ))}
         </ul>
        <div className="card-actions justify-end">
          <button className="btn">Set appoinment!</button>
        </div>
      </div>
    </div>
    //   <div className="bg-white rounded-lg shadow-md p-4 m-4">
    //     <h2 className="text-lg font-semibold">{name}</h2>
    //     <p className="text-gray-600 mb-2">{designation}</p>
    //     <p className="mb-2">{specialty}</p>
    //     <p className="text-gray-700">Visiting Hours:</p>
    //     <ul className="list-disc list-inside">
    //       {visitingHours.map((time, index) => (
    //         <li key={index}>{time}</li>
    //       ))}
    //     </ul>
    //   </div>
  );
};

const DoctorsPage = () => {
  const doctors = [
    {
      name: "Dr. John Doe",
      designation: "Cardiologist",
      specialty: "Heart diseases",
      visitingHours: ["Mon 9AM-12PM", "Wed 2PM-5PM", "Fri 10AM-1PM"],
    },
    {
      name: "Dr. Emily Smith",
      designation: "Dermatologist",
      specialty: "Skin disorders",
      visitingHours: ["Tue 11AM-2PM", "Thu 3PM-6PM", "Sat 9AM-12PM"],
    },
    // Add more doctors here...
    {
      name: "Dr. Sarah Johnson",
      designation: "Pediatrician",
      specialty: "Childcare",
      visitingHours: ["Mon 1PM-4PM", "Wed 9AM-12PM", "Fri 2PM-5PM"],
    },
    {
      name: "Dr. Michael Brown",
      designation: "Orthopedic Surgeon",
      specialty: "Bone injuries",
      visitingHours: ["Tue 9AM-12PM", "Thu 2PM-5PM", "Sat 10AM-1PM"],
    },
    // Add more doctors here...
    {
        name: "Dr. John Doe",
        designation: "Cardiologist",
        specialty: "Heart diseases",
        visitingHours: ["Mon 9AM-12PM", "Wed 2PM-5PM", "Fri 10AM-1PM"],
      },
      {
        name: "Dr. Emily Smith",
        designation: "Dermatologist",
        specialty: "Skin disorders",
        visitingHours: ["Tue 11AM-2PM", "Thu 3PM-6PM", "Sat 9AM-12PM"],
      },
      // Add more doctors here...
      {
        name: "Dr. Sarah Johnson",
        designation: "Pediatrician",
        specialty: "Childcare",
        visitingHours: ["Mon 1PM-4PM", "Wed 9AM-12PM", "Fri 2PM-5PM"],
      },
      {
        name: "Dr. Michael Brown",
        designation: "Orthopedic Surgeon",
        specialty: "Bone injuries",
        visitingHours: ["Tue 9AM-12PM", "Thu 2PM-5PM", "Sat 10AM-1PM"],
      },
  ];

  return (
    <div className="flex flex-wrap gap-8 justify-center my-8">
      {doctors.map((doctor, index) => (
        <DoctorCard
          key={index}
          name={doctor.name}
          designation={doctor.designation}
          specialty={doctor.specialty}
          visitingHours={doctor.visitingHours}
        />
      ))}
    </div>
  );
};

export default DoctorsPage;
