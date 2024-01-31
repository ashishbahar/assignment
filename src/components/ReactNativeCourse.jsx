import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import img1 from "../assets/images/png/img1.png";
import img2 from "../assets/images/png/img2.png";
import img3 from "../assets/images/png/img3.png";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf08iEXrFAf6cza6w1NrqDq2ih4YchcNA",
  authDomain: "alemeno-4ed1f.firebaseapp.com",
  projectId: "alemeno-4ed1f",
  storageBucket: "alemeno-4ed1f.appspot.com",
  messagingSenderId: "737798205935",
  appId: "1:737798205935:web:385e156564249f3780861a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const ReactNativeCourse = () => {
  const [sourceCodeData, setSourceCodeData] = useState([]);

  useEffect(() => {
    const fetchSourceCodeData = async () => {
      const documentIds = ["NpMcTW3MogNIy7kXTz5K"];

      try {
        const promises = documentIds.map(async (documentId) => {
          const docRef = doc(db, "sourceCode", documentId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            return docSnap.data();
          } else {
            console.log(`No such document for ID ${documentId}`);
            return null;
          }
        });

        const data = await Promise.all(promises);
        setSourceCodeData(data.filter((item) => item !== null));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSourceCodeData();
  }, [db]);

  return (
    <div className="bg-black overflow-x-hidden py-3">
      <center>
        <h2 className="text-white">Course Details</h2>
      </center>
      <div className="mt-5">
        {sourceCodeData.map((data, index) => (
          <div key={index} className="col-12">
            <div className="row p-2 h-100">
              <div className="col-6">
                <h2 className="text-white">Course Name: {data.name}</h2>
                <h2 className="text-white mt-3">
                  Instructor: {data.instructor}
                </h2>
                <p className="text-white mt-3">
                  Description: {data.description}
                </p>
              </div>
              <div className="col-6 text-center">
                {data.img === "img1" && (
                  <img className="w-50" src={img1} alt="" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReactNativeCourse;