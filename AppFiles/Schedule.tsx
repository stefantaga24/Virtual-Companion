/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  FlatList,
  Image,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import HourComponent from './HourComponent';
const blackColor = '#434343';
const beigeColor = '#F4F1E3';
const databaseRef = firebase
  .app()
  .database(
    'https://appcaragiale-default-rtdb.europe-west1.firebasedatabase.app/',
  );
var today = new Date();
const weekDays = [
  'Luni',
  'Marți',
  'Miercuri',
  'Joi',
  'Vineri',
  'Sambata',
  'Duminica',
  '',
  '',
  '',
];
var todayWeekDay = today.getDay();
var currentYear = today.getFullYear();
function weekDayConverter(weekDay: any) {
  return weekDay === 0 ? 6 : weekDay - 1;
}
var finalWeekDay = weekDayConverter(todayWeekDay);
const convertTimePeriod: any = {
  am1: '7:30 - 8:20',
  am2: '8:30 - 9:20',
  am3: '9:30 - 10:20',
  am4: '10:30 - 11:20',
  am5: '11:30 - 12:20',
  am6: '12:30 - 13:20',
  pm1: '13:30 - 14:20',
  pm2: '14:30 - 15:20',
  pm3: '15:30 - 16:20',
  pm4: '16:30 - 17:20',
  pm5: '17:30 - 18:20',
  pm6: '18:30 - 19:20',
};
function getTomorrow(date: Date) {
  const tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() + 1);
  return tomorrow;
}
function getYesterday(date: Date) {
  const tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() - 1);
  return tomorrow;
}
function GenerateCalendar(schedule: any, selectedWeekDay: any) {
  if (selectedWeekDay === 5 || selectedWeekDay === 6) {
    return <View />;
  }
  var hourList: any = [];
  var currentWeekDay: any = schedule[weekDays[selectedWeekDay]];
  var nr = 0;
  for (const timePeriod in currentWeekDay) {
    nr = nr + 1;
    hourList.push({
      id: nr,
      timePeriodString: convertTimePeriod[timePeriod],
      subjectName: currentWeekDay[timePeriod].subject_name,
      class_location: currentWeekDay[timePeriod].class_location,
      teacher_name: currentWeekDay[timePeriod].teacher_name,
    });
  }
  hourList.sort(
    (a: any, b: any) =>
      parseInt(a.timePeriodString.substring(0, 2), 10) -
      parseInt(b.timePeriodString.substring(0, 2), 10),
  );
  return (
    <View>
      {hourList.map((hour: any) => (
        <HourComponent
          class_location={hour.class_location}
          id={hour.id}
          teacher_name={hour.teacher_name}
          timePeriodString={hour.timePeriodString}
          subjectName={hour.subjectName}
        />
      ))}
    </View>
  );
}
function initialWeek(currentDate: Date) {
  var finalResult = [currentDate];
  var dateCopy = getTomorrow(currentDate);
  for (let i = 0; i < 25; i++) {
    finalResult.push(dateCopy);
    dateCopy = getTomorrow(dateCopy);
  }
  return finalResult;
}
function datesAreEqual(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
function Schedule({route, navigation}: {route: any; navigation: any}) {
  const [loading, setLoading] = useState(true);
  const data = initialWeek(getYesterday(today));
  const [schedule, setSchedule] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedWeekDay, setWeekDay] = useState(finalWeekDay);
  const [selectedYear, setYear] = useState(currentYear);
  var id = route.params.id;

  function getShortMonthName(date: Date) {
    const options: any = {month: 'short'};
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  const renderDateItem = ({item}: any) => {
    if (datesAreEqual(item, selectedDate) === true) {
      return (
        <TouchableNativeFeedback
          onPress={() => {
            setSelectedDate(new Date(item));
            setWeekDay(weekDayConverter(item.getDay()));
            setYear(item.getFullYear());
          }}>
          <View
            style={{
              marginRight: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: blackColor,
                width: 65,
                height: 24,
                borderRadius: 7,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Inter-SemiBold',
                  color: beigeColor,
                }}>
                {getShortMonthName(item) + item.getUTCDate().toString()}
              </Text>
            </View>
            <Text
              style={{
                color: blackColor,
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
              }}>
              {weekDays[weekDayConverter(item.getDay())].substring(0, 3)}
            </Text>
          </View>
        </TouchableNativeFeedback>
      );
    }
    try {
      return (
        <TouchableNativeFeedback
          onPress={() => {
            setSelectedDate(new Date(item));
            setWeekDay(weekDayConverter(item.getDay()));
            setYear(item.getFullYear());
          }}>
          <View
            style={{
              marginRight: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: blackColor,
                fontSize: 18,
                height: 24,
                fontFamily: 'Inter-SemiBold',
              }}>
              {item.getDate()}
            </Text>
            <Text
              style={{
                color: blackColor,
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
              }}>
              {weekDays[weekDayConverter(item.getDay())].substring(0, 1)}
            </Text>
          </View>
        </TouchableNativeFeedback>
      );
    } catch (error) {
      console.log(item.getDay());
    }
  };

  useEffect(() => {
    if (loading === false) {
      return;
    }
    databaseRef
      .ref('Students/' + id)
      .once('value')
      .then(snapshot5 => {
        databaseRef
          .ref('Classes/' + snapshot5.val().ClassID)
          .once('value')
          .then(snapshot => {
            setSchedule(snapshot.val());
          });
      });
    if (schedule) {
      setLoading(false);
    }
  }, [loading, id, schedule]);
  if (loading) {
    return (
      <View style={{flex: 1, backgroundColor: '#F6F2DB'}}>
        <ImageBackground
          style={{flex: 1}}
          source={require('./Images/BackgroundBlend.png')}
        />
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#F6F2DB'}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('./Images/BackgroundBlend.png')}>
        <View style={{flex: 1}}>
          <View style={{marginTop: '10%', marginLeft: '5%'}}>
            <Text
              style={{fontFamily: 'Inter-Black', fontSize: 20, color: 'black'}}>
              {selectedYear}
            </Text>
          </View>
          <FlatList
            data={data}
            renderItem={renderDateItem}
            horizontal={true}
            style={{marginTop: '2%', marginLeft: '2%'}}
            //onEndReached={fetchNextPage}
            //onEndReachedThreshold={0.8}
            //ListFooterComponent={ListEndLoader} // Loader when loading next page.
          />
        </View>
        <View style={{flex: 2}}>
          <View
            style={{flexDirection: 'row', marginTop: '5%', marginLeft: '5%'}}>
            <View
              style={{
                height: 28,
                width: 125,
                borderRadius: 7,
                backgroundColor: blackColor,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#F4F1E3',
                  fontFamily: 'Inter-SemiBold',
                  marginLeft: '8%',
                }}>
                Schedule
              </Text>
            </View>
            <Image
              source={require('./Images/ScheduleClock.png')}
              style={{height: 28, width: 28, marginLeft: '5%'}}
            />
          </View>
          <View style={{marginTop: '10%', marginLeft: '10%'}}>
            {GenerateCalendar(schedule, selectedWeekDay)}
          </View>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            marginBottom: '8%',
            marginLeft: '6%',
          }}>
          <TouchableNativeFeedback
            onPress={() => {
              navigation.goBack();
              //navigation.navigate("ChooseUser");
            }}>
            <Image
              source={require('./Images/arrowLeft.png')}
              style={{height: 24, width: 24}}
            />
          </TouchableNativeFeedback>
        </View>
      </ImageBackground>
    </View>
  );
}
export default Schedule;
