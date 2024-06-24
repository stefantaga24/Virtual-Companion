import {StyleSheet} from 'react-native';

const blackColor = '#434343';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  gradeInput: {
    height: 32,
    width: 40,
    borderRadius: 10,
    borderColor: blackColor,
    borderWidth: 2,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: blackColor,
    textAlignVertical: 'center',
  },
  gradesListStyle: {
    width: 180,
  },
  gradeText: {
    fontSize: 18,
    marginRight: 10,
    color: blackColor,
    fontFamily: 'Inter-SemiBold',
  },
});
