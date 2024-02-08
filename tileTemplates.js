console.log("tileTemplates.js");
const templateTailes = {
    selectedTemplate : 'roads',
    
    demo : {
      path : './tiles/demo',
      numOfTiles : 2,
      rotateStartIndex : 1,
      edges: [
        ['AAA', 'AAA', 'AAA', 'AAA'],
        ['ABA', 'ABA', 'AAA', 'ABA']
      ]
    },
    bluetraks : {
      path : './tiles/blue-tracks',
      numOfTiles : 5,
      rotateStartIndex : 2,
      edges: [
        ['AAA', 'AAA', 'AAA', 'AAA'],
        ['BBB', 'BBB', 'BBB', 'BBB'],
        ['ABA', 'ABA', 'AAA', 'AAA'],
        ['AAA', 'ABA', 'AAA', 'ABA'],
        ['ABA', 'ABA', 'AAA', 'ABA']
      ]
    },
    mountains : {
      path : './tiles/mountains',
      numOfTiles : 6,
      rotateStartIndex : 2,
      edges: [
        ["AAA", "AAA", "AAA", "AAA"],
        ["BBB", "BBB", "BBB", "BBB"],
        ["AAA", "AAA", "AAA", "BBB"],
        ["AAA", "AAA", "BBB", "BBB"],
        ["AAA", "BBB", "AAA", "BBB"],
        ["AAA", "BBB", "BBB", "BBB"]
      ]
    },
    rail : {
      path : './tiles/rail',
      numOfTiles : 5,
      rotateStartIndex : 2,
      edges: [
        ['AAA', 'AAA', 'AAA', 'AAA'],
        ['BBB', 'BBB', 'BBB', 'BBB'],
        ['ABA', 'ABA', 'ABA', 'AAA'],
        ['ABA', 'ABA', 'AAA', 'AAA'],
        ['ABA', 'AAA', 'ABA', 'AAA']
      ]
    },
    roads : {
      path : './tiles/roads',
      numOfTiles : 5,
      rotateStartIndex : 2,
      edges: [
        ['AAA', 'AAA', 'AAA', 'AAA'],
        ['ABA', 'ABA', 'ABA', 'ABA'],
        ['ABA', 'ABA', 'AAA', 'ABA'],
        ['AAA', 'ABA', 'AAA', 'ABA'],
        ['ABA', 'ABA', 'AAA', 'AAA']
      ]
    },
    circuit : {
      path : './tiles/circuit',
      numOfTiles : 13,
      rotateStartIndex : 3,
      edges: [
        ['AAA', 'AAA', 'AAA', 'AAA'],
        ['BBB', 'BBB', 'BBB', 'BBB'],
        ['BCB', 'BCB', 'BCB', 'BCB'],
        ['BBB', 'BCB', 'BBB', 'BBB'],
        ['BCB', 'BCB', 'BBB', 'BBB'],
        ['BBB', 'BCB', 'BBB', 'BCB'],
        ['BCB', 'BCB', 'BBB', 'BCB'],
        ['BBB', 'BCB', 'BBB', 'BCB'],
        ['BCB', 'BCB', 'BBB', 'BBB'],
        ['BCB', 'BCB', 'BBB', 'BCB'],
        ['BCB', 'BCB', 'BCB', 'BCB'],
        ['BCB', 'BCB', 'BBB', 'BBB'],
        ['ABB', 'BCB', 'BBA', 'AAA'],
//********** */
        ['ABB', 'BBB', 'BBB', 'BBA'],
        ['ACB', 'BCB', 'BBB', 'BBA'],
        ['BCA', 'ACB', 'BBB', 'BBB'],
        ['ABB', 'BCB', 'BBB', 'BCA'],
        ['BCB', 'BCB', 'BBA', 'ABB'],
        ['BCB', 'BCA', 'AAA', 'ACB'],
        ['BCB', 'BBA', 'AAA', 'ABB'],
        ['BCB', 'BCA', 'AAA', 'ABB'],
        ['BBB', 'BBA', 'AAA', 'ACB']
      ]
    }
  }