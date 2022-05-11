import {
  initializeApp
} from "firebase/app";
import {
  collection,
  getFirestore,
  getDocs,
  getDoc,
  doc
} from 'firebase/firestore'

// Firebase CONFIG API
const firebaseConfig = {
  apiKey: "AIzaSyDmfHaPufGVZ9Ave6vOnjoaIdnddx-O8BE",
  authDomain: "umatter-eb3a0.firebaseapp.com",
  projectId: "umatter-eb3a0",
  storageBucket: "umatter-eb3a0.appspot.com",
  messagingSenderId: "130340542804",
  appId: "1:130340542804:web:24e34053a87f2d207210c1",
  measurementId: "G-TT00X3XPMK"
};


let contact = 'Please report to umatter.reboot@gmail.com';









































// Initialize 
initializeApp(firebaseConfig)
// 
const db = getFirestore()

// Total users logged in to the app
function getTotalUsers() {
  const ref = collection(db, 'users/users_list/users_info')
  getDocs(ref)
    .then((snapshot) => {
      let totalUsers = [];
      let temp = [];
      let gender = [];

      snapshot.docs.forEach((doc) => {
        totalUsers.push({
          ...doc.data()
        })
      })

      for (var i = 0; i < totalUsers.length; i++) {
        temp.push(totalUsers[i]['age'])
        gender.push(totalUsers[i]['gender'])

      }

      let female = [];
      let male = [];
      
      for(var x = 0; x<gender.length; x++){ 

        if(gender[x ] === "Male"){
          male.push(gender[x])
        }else if(gender[x] === "Female"){
          female.push(gender[x])
        }else{
          console.log("Please Contact the admin")
        }
      }
      document.querySelector('#total-users').innerHTML = totalUsers.length;
      document.querySelector('#total-female').innerHTML = female.length;
      document.querySelector('#total-male').innerHTML = male.length;
    })
    .catch((error) => {
      console.log(contact);
    })
    .finally(() => {

    });
}

getTotalUsers()

// Total counselors available
function getCounselorLen() {
  const ref = collection(db, 'counselors')
  getDocs(ref)
    .then((snapshot) => {
      let counselor = [];
      snapshot.docs.forEach((doc) => {
        counselor.push({
          ...doc.data(),
          id: doc.id
        })
        // console.log(counselor);

      })
      document.querySelector('#total-counselors').innerHTML = counselor.length;
    })
    .catch((error) => {
      console.log(contact)
    })
    .finally(() => {

    });
}

getCounselorLen()

// Total journals created
function getTotalJournalCreated() {
  const ref = collection(db, 'users/journal/notes')
  getDocs(ref)
    .then((snapshot) => {
      let totalJournals = [];
      snapshot.docs.forEach((doc) => {
        totalJournals.push({
          ...doc.data()
        })
      })
      // console.log(totalJournals)
      totalJournals = document.querySelector('#total-journals').innerHTML = totalJournals.length;
    })
    .catch((error) => {
      console.log(contact)
    })
    .finally(() => {

    });
}

getTotalJournalCreated();


function getAssessmentRes() {
  const ref = collection(db, 'users/assessment/assessment/')
  getDocs(ref)
    .then((snapshot) => {
      let assessmentRes = []
      let temp = []
      let mild = []
      let moderate = []
      let moderately_severe = []
      let severe = []

      let userSelection = []
      let userSelection1 = []
      let userSelection2 = []
      let userSelection3 = []
      let userSelection4 = []
      let userSelection5 = []

      snapshot.docs.forEach((doc) => {
        assessmentRes.push({
          ...doc.data()
        })
      })

      for (var i = 0; i < assessmentRes.length; i++) {
        temp.push(assessmentRes[i]['depression_severity'])
        userSelection.push(assessmentRes[i]['user_selection'])
      }

      // 
      userSelection.map((data) => {
        for (var j = 0; j < data.length; j++) {
          userSelection1.push(data[j])
        }
      })
      
      // 
      for(var n =0; n< userSelection1.length; n++){
        // console.log(userSelection1[n])
        if (userSelection1[n] === "Not at all") {
            userSelection2.push(userSelection1[n]) 
          }else if (userSelection1[n] === "Several days") {
            userSelection3.push(userSelection1[n]) 
          }else if (userSelection1[n] === "More than half the days") {
            userSelection4.push(userSelection1[n]) 
          }else if (userSelection1[n] === "Nearly Everyday") {
            userSelection5.push(userSelection1[n]) 
          }
      }

      
      
      const assessment_doughnut = document.getElementById('assessment-doughnut').getContext('2d');
      const doughnutChart = new Chart(assessment_doughnut, {
        type: 'doughnut',
        data: {
          // labels: ['Not at all', 'Several days', 'More than half the days', 'Nearly Everyday'],
          datasets: [{
            // label: '# of Votes',
            data: [userSelection2.length, userSelection3.length, userSelection4.length, userSelection5.length],
            backgroundColor: [
              '#4ADE80',
              '#FACC15',
              '#F97316',
              '#B91C1C',
            ],
            // borderColor: [
            //   'rgba(255, 99, 132, 1)',
            //   'rgba(54, 162, 235, 1)',
            //   'rgba(255, 206, 86, 1)',
            //   'rgba(75, 192, 192, 1)',

            // ],
          }],
          
        },
        options: {
          responsive : true,
          maintainAspectRation : false,
          layout: {
          
          }
        }
      });



      for (var x = 0; x <= temp.length; x++) {
        if (temp[x] === 'Mild') {
          mild.push(temp[x])
          document.querySelector('#mild').innerHTML = mild.length
        } else if (temp[x] === 'Moderate') {
          moderate.push(temp[x])
          document.querySelector('#moderate').innerHTML = moderate.length
        } else if (temp[x] === 'Moderately Severe') {
          moderately_severe.push(temp[x]);
          document.querySelector('#moderately-severe').innerHTML = moderately_severe.length
        } else if (temp[x] === "Severe") {
          severe.push(temp[x]);
          document.querySelector('#severe-depression').innerHTML = severe.length
        }
      }
      
      

      const assessment_chart = document.getElementById('assessment-chart').getContext('2d');
      const pieChart = new Chart(assessment_chart, {
        type: 'pie',
        data: {
          // labels: ['Mild', 'Moderate', 'Moderately Severe', 'Severe Depression'],
          datasets: [{
            // label: '# of Votes',
            data: [mild.length, moderate.length, moderately_severe.length, severe.length],
            backgroundColor: [
              '#4ADE80',
              '#FACC15',
              '#F97316',
              '#B91C1C',
            ],
            // borderColor: [
            //   '#52b788',
            //   '#ffea00',
            //   '#dc2f02',
            //   '$d90429',

            // ],
          }]
        },
        options: {
          responsive : true,
          maintainAspectRation : false,
          layout: {
          
          }
        }
      });

    })
    .catch((error) => {
      console.log(contact)
    })
    .finally(() => {

    })
}

getAssessmentRes()