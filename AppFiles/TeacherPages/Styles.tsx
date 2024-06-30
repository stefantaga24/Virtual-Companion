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
    width: '100%',
    padding: -2,
    borderColor: blackColor,
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
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
  blackColor: {
    color: 'black',
  },
});
