import Cell from './models/Cell';
import CellManager from './models/CellManager';

// The key representations the neighbor configuration
const expectedResultsForLivingCell = [

  false,  // 0000 0000   000
  false,  // 0000 0001   001
  false,  // 0000 0010   002
  true,   // 0000 0011   003
  false,  // 0000 0100   004
  true,   // 0000 0101   005
  true,   // 0000 0110   006
  true,   // 0000 0111   007
  false,  // 0000 1000   008
  true,   // 0000 1001   009
  true,   // 0000 1010   010
  true,   // 0000 1011   011
  true,   // 0000 1100   012
  true,   // 0000 1101   013
  true,   // 0000 1110   014
  false,  // 0000 1111   015

  false,  // 0001 0000   016
  true,   // 0001 0001   017
  true,   // 0001 0010   018
  true,   // 0001 0011   019
  true,   // 0001 0100   020
  true,   // 0001 0101   021
  true,   // 0001 0110   022
  false,  // 0001 0111   023
  true,   // 0001 1000   024
  true,   // 0001 1001   025
  true,   // 0001 1010   026
  false,  // 0001 1011   027
  true,   // 0001 1100   028
  false,  // 0001 1101   029
  false,  // 0001 1110   030
  false,  // 0001 1111   031

  false,  // 0010 0000   032
  true,   // 0010 0001   033
  true,   // 0010 0010   034
  true,   // 0010 0011   035
  true,   // 0010 0100   036
  true,   // 0010 0101   037
  true,   // 0010 0110   038
  false,  // 0010 0111   039
  true,   // 0010 1000   040
  true,   // 0010 1001   041
  true,   // 0010 1010   042
  false,  // 0010 1011   043
  true,   // 0010 1100   044
  false,  // 0010 1101   045
  false,  // 0010 1110   046
  false,  // 0010 1111   047

  true,   // 0011 0000   048
  true,   // 0011 0001   049
  true,   // 0011 0010   050
  false,  // 0011 0011   051
  true,   // 0011 0100   052
  false,  // 0011 0101   053
  false,  // 0011 0110   054
  false,  // 0011 0111   055
  true,   // 0011 1000   056
  false,  // 0011 1001   057
  false,  // 0011 1010   058
  false,  // 0011 1011   059
  false,  // 0011 1100   060
  false,  // 0011 1101   061
  false,  // 0011 1110   062
  false,  // 0011 1111   063

  false,  // 0100 0000   064
  true,   // 0100 0001   065
  true,   // 0100 0010   066
  true,   // 0100 0011   067
  true,   // 0100 0100   068
  true,   // 0100 0101   069
  true,   // 0100 0110   070
  false,  // 0100 0111   071

  true,   // 0100 1000   072
  true,   // 0100 1001   073
  true,   // 0100 1010   074
  false,  // 0100 1011   075
  true,   // 0100 1100   076
  false,  // 0100 1101   077
  false,  // 0100 1110   078
  false,  // 0100 1111   079

  true,   // 0101 0000   080
  true,   // 0101 0001   081
  true,   // 0101 0010   082
  false,  // 0101 0011   083
  true,   // 0101 0100   084
  false,  // 0101 0101   085
  false,  // 0101 0110   086
  false,  // 0101 0111   087

  true,   // 0101 1000   088
  false,  // 0101 1001   089
  false,  // 0101 1010   090
  false,  // 0101 1011   091
  false,  // 0101 1100   092
  false,  // 0101 1101   093
  false,  // 0101 1110   094
  false,  // 0101 1111   095

  true,   // 0110 0000   096
  true,   // 0110 0001   097
  true,   // 0110 0010   098
  false,  // 0110 0011   099
  true,   // 0110 0100   100
  false,  // 0110 0101   101
  false,  // 0110 0110   102
  false,  // 0110 0111   103

  true,   // 0110 1000   104
  false,  // 0110 1001   105
  false,  // 0110 1010   106
  false,  // 0110 1011   107
  false,  // 0110 1100   108
  false,  // 0110 1101   109
  false,  // 0110 1110   110
  false,  // 0110 1111   111

  true,   // 0111 0000   112
  false,  // 0111 0001   113
  false,  // 0111 0010   114
  false,  // 0111 0011   115
  false,  // 0111 0100   116
  false,  // 0111 0101   117
  false,  // 0111 0110   118
  false,  // 0111 0111   119

  false,  // 0111 1000   120
  false,  // 0111 1001   121
  false,  // 0111 1010   122
  false,  // 0111 1011   123
  false,  // 0111 1100   124
  false,  // 0111 1101   125
  false,  // 0111 1110   126
  false,  // 0111 1111   127

  false,  // 1000 0000   128
  true,   // 1000 0001   129
  true,   // 1000 0010   130
  true,   // 1000 0011   131
  true,   // 1000 0100   132
  true,   // 1000 0101   133
  true,   // 1000 0110   134
  false,  // 1000 0111   135

  true,   // 1000 1000   136
  true,   // 1000 1001   137
  true,   // 1000 1010   138
  false,  // 1000 1011   139
  true,   // 1000 1100   140
  false,  // 1000 1101   141
  false,  // 1000 1110   142
  false,  // 1000 1111   143

  true,   // 1001 0000   144
  true,   // 1001 0001   145
  true,   // 1001 0010   146
  false,  // 1001 0011   147
  true,   // 1001 0100   148
  false,  // 1001 0101   149
  false,  // 1001 0110   150
  false,  // 1001 0111   151

  true,   // 1001 1000   152
  false,  // 1001 1001   153
  false,  // 1001 1010   154
  false,  // 1001 1011   155
  false,  // 1001 1100   156
  false,  // 1001 1101   157
  false,  // 1001 1110   158
  false,  // 1001 1111   159


  true,   // 1010 0000   160
  true,   // 1010 0001   161
  true,   // 1010 0010   162
  false,  // 1010 0011   163
  true,   // 1010 0100   164
  false,  // 1010 0101   165
  false,  // 1010 0110   166
  false,  // 1010 0111   167

  true,   // 1010 1000   168
  false,  // 1010 1001   169
  false,  // 1010 1010   170
  false,  // 1010 1011   171
  false,  // 1010 1100   172
  false,  // 1010 1101   173
  false,  // 1010 1110   174
  false,  // 1010 1111   175

  true,   // 1011 0000   176
  false,  // 1011 0001   177
  false,  // 1011 0010   178
  false,  // 1011 0011   179
  false,  // 1011 0100   180
  false,  // 1011 0101   181
  false,  // 1011 0110   182
  false,  // 1011 0111   183

  false,  // 1011 1000   184
  false,  // 1011 1001   185
  false,  // 1011 1010   186
  false,  // 1011 1011   187
  false,  // 1011 1100   188
  false,  // 1011 1101   189
  false,  // 1011 1110   190
  false,  // 1011 1111   191

  true,   // 1100 0000   192
  true,   // 1100 0001   193
  true,   // 1100 0010   194
  false,  // 1100 0011   195
  true,   // 1100 0100   196
  false,  // 1100 0101   197
  false,  // 1100 0110   198
  false,  // 1100 0111   199

  true,   // 1100 1000   200
  false,  // 1100 1001   201
  false,  // 1100 1010   202
  false,  // 1100 1011   203
  false,  // 1100 1100   204
  false,  // 1100 1101   205
  false,  // 1100 1110   206
  false,  // 1100 1111   207

  true,   // 1101 0000   208
  false,  // 1101 0001   209
  false,  // 1101 0010   210
  false,  // 1101 0011   211
  false,  // 1101 0100   212
  false,  // 1101 0101   213
  false,  // 1101 0110   214
  false,  // 1101 0111   215

  false,  // 1101 1000   216
  false,  // 1101 1001   217
  false,  // 1101 1010   218
  false,  // 1101 1011   219
  false,  // 1101 1100   220
  false,  // 1101 1101   221
  false,  // 1101 1110   222
  false,  // 1101 1111   223

  true,   // 1110 0000   224
  false,  // 1110 0001   225
  false,  // 1110 0010   226
  false,  // 1110 0011   227
  false,  // 1110 0100   228
  false,  // 1110 0101   229
  false,  // 1110 0110   230
  false,  // 1110 0111   231

  false,  // 1110 1000   232
  false,  // 1110 1001   233
  false,  // 1110 1010   234
  false,  // 1110 1011   235
  false,  // 1110 1100   236
  false,  // 1110 1101   237
  false,  // 1110 1110   238
  false,  // 1110 1111   239

  false,  // 1111 0000   240
  false,  // 1111 0001   241
  false,  // 1111 0010   242
  false,  // 1111 0011   243
  false,  // 1111 0100   244
  false,  // 1111 0101   245
  false,  // 1111 0110   246
  false,  // 1111 0111   247

  false,  // 1111 1000   248
  false,  // 1111 1001   249
  false,  // 1111 1010   250
  false,  // 1111 1011   251
  false,  // 1111 1100   252
  false,  // 1111 1101   253
  false,  // 1111 1110   254
  false,  // 1111 1111   255
];


// The key representations the neighbor configuration
const expectedResultsForDeadCell = [

  false,  // 0000 0000   000
  false,  // 0000 0001   001
  false,  // 0000 0010   002
  false,  // 0000 0011   003
  false,  // 0000 0100   004
  false,  // 0000 0101   005
  false,  // 0000 0110   006
  true,   // 0000 0111   007
  false,  // 0000 1000   008
  false,  // 0000 1001   009
  false,  // 0000 1010   010
  true,   // 0000 1011   011
  false,  // 0000 1100   012
  true,   // 0000 1101   013
  true,   // 0000 1110   014
  false,  // 0000 1111   015

  false,  // 0001 0000   016
  false,  // 0001 0001   017
  false,  // 0001 0010   018
  true,   // 0001 0011   019
  false,  // 0001 0100   020
  true,   // 0001 0101   021
  true,   // 0001 0110   022
  false,  // 0001 0111   023
  false,  // 0001 1000   024
  true,   // 0001 1001   025
  true,   // 0001 1010   026
  false,  // 0001 1011   027
  true,   // 0001 1100   028
  false,  // 0001 1101   029
  false,  // 0001 1110   030
  false,  // 0001 1111   031

  false,  // 0010 0000   032
  false,  // 0010 0001   033
  false,  // 0010 0010   034
  true,   // 0010 0011   035
  false,  // 0010 0100   036
  true,   // 0010 0101   037
  true,   // 0010 0110   038
  false,  // 0010 0111   039
  false,  // 0010 1000   040
  true,   // 0010 1001   041
  true,   // 0010 1010   042
  false,  // 0010 1011   043
  true,   // 0010 1100   044
  false,  // 0010 1101   045
  false,  // 0010 1110   046
  false,  // 0010 1111   047

  false,  // 0011 0000   048
  true,   // 0011 0001   049
  true,   // 0011 0010   050
  false,  // 0011 0011   051
  true,   // 0011 0100   052
  false,  // 0011 0101   053
  false,  // 0011 0110   054
  false,  // 0011 0111   055
  true,   // 0011 1000   056
  false,  // 0011 1001   057
  false,  // 0011 1010   058
  false,  // 0011 1011   059
  false,  // 0011 1100   060
  false,  // 0011 1101   061
  false,  // 0011 1110   062
  false,  // 0011 1111   063

  false,  // 0100 0000   064
  false,  // 0100 0001   065
  false,  // 0100 0010   066
  true,   // 0100 0011   067
  false,  // 0100 0100   068
  true,   // 0100 0101   069
  true,   // 0100 0110   070
  false,  // 0100 0111   071

  false,  // 0100 1000   072
  true,   // 0100 1001   073
  true,   // 0100 1010   074
  false,  // 0100 1011   075
  true,   // 0100 1100   076
  false,  // 0100 1101   077
  false,  // 0100 1110   078
  false,  // 0100 1111   079

  false,  // 0101 0000   080
  true,   // 0101 0001   081
  true,   // 0101 0010   082
  false,  // 0101 0011   083
  true,   // 0101 0100   084
  false,  // 0101 0101   085
  false,  // 0101 0110   086
  false,  // 0101 0111   087

  true,   // 0101 1000   088
  false,  // 0101 1001   089
  false,  // 0101 1010   090
  false,  // 0101 1011   091
  false,  // 0101 1100   092
  false,  // 0101 1101   093
  false,  // 0101 1110   094
  false,  // 0101 1111   095

  false,  // 0110 0000   096
  true,   // 0110 0001   097
  true,   // 0110 0010   098
  false,  // 0110 0011   099
  true,   // 0110 0100   100
  false,  // 0110 0101   101
  false,  // 0110 0110   102
  false,  // 0110 0111   103

  true,   // 0110 1000   104
  false,  // 0110 1001   105
  false,  // 0110 1010   106
  false,  // 0110 1011   107
  false,  // 0110 1100   108
  false,  // 0110 1101   109
  false,  // 0110 1110   110
  false,  // 0110 1111   111

  true,   // 0111 0000   112
  false,  // 0111 0001   113
  false,  // 0111 0010   114
  false,  // 0111 0011   115
  false,  // 0111 0100   116
  false,  // 0111 0101   117
  false,  // 0111 0110   118
  false,  // 0111 0111   119

  false,  // 0111 1000   120
  false,  // 0111 1001   121
  false,  // 0111 1010   122
  false,  // 0111 1011   123
  false,  // 0111 1100   124
  false,  // 0111 1101   125
  false,  // 0111 1110   126
  false,  // 0111 1111   127

  false,  // 1000 0000   128
  false,  // 1000 0001   129
  false,  // 1000 0010   130
  true,   // 1000 0011   131
  false,  // 1000 0100   132
  true,   // 1000 0101   133
  true,   // 1000 0110   134
  false,  // 1000 0111   135

  false,  // 1000 1000   136
  true,   // 1000 1001   137
  true,   // 1000 1010   138
  false,  // 1000 1011   139
  true,   // 1000 1100   140
  false,  // 1000 1101   141
  false,  // 1000 1110   142
  false,  // 1000 1111   143

  false,  // 1001 0000   144
  true,   // 1001 0001   145
  true,   // 1001 0010   146
  false,  // 1001 0011   147
  true,   // 1001 0100   148
  false,  // 1001 0101   149
  false,  // 1001 0110   150
  false,  // 1001 0111   151

  true,   // 1001 1000   152
  false,  // 1001 1001   153
  false,  // 1001 1010   154
  false,  // 1001 1011   155
  false,  // 1001 1100   156
  false,  // 1001 1101   157
  false,  // 1001 1110   158
  false,  // 1001 1111   159

  false,  // 1010 0000   160
  true,   // 1010 0001   161
  true,   // 1010 0010   162
  false,  // 1010 0011   163
  true,   // 1010 0100   164
  false,  // 1010 0101   165
  false,  // 1010 0110   166
  false,  // 1010 0111   167

  true,   // 1010 1000   168
  false,  // 1010 1001   169
  false,  // 1010 1010   170
  false,  // 1010 1011   171
  false,  // 1010 1100   172
  false,  // 1010 1101   173
  false,  // 1010 1110   174
  false,  // 1010 1111   175

  true,   // 1011 0000   176
  false,  // 1011 0001   177
  false,  // 1011 0010   178
  false,  // 1011 0011   179
  false,  // 1011 0100   180
  false,  // 1011 0101   181
  false,  // 1011 0110   182
  false,  // 1011 0111   183

  false,  // 1011 1000   184
  false,  // 1011 1001   185
  false,  // 1011 1010   186
  false,  // 1011 1011   187
  false,  // 1011 1100   188
  false,  // 1011 1101   189
  false,  // 1011 1110   190
  false,  // 1011 1111   191

  false,  // 1100 0000   192
  true,   // 1100 0001   193
  true,   // 1100 0010   194
  false,  // 1100 0011   195
  true,   // 1100 0100   196
  false,  // 1100 0101   197
  false,  // 1100 0110   198
  false,  // 1100 0111   199

  true,   // 1100 1000   200
  false,  // 1100 1001   201
  false,  // 1100 1010   202
  false,  // 1100 1011   203
  false,  // 1100 1100   204
  false,  // 1100 1101   205
  false,  // 1100 1110   206
  false,  // 1100 1111   207

  true,   // 1101 0000   208
  false,  // 1101 0001   209
  false,  // 1101 0010   210
  false,  // 1101 0011   211
  false,  // 1101 0100   212
  false,  // 1101 0101   213
  false,  // 1101 0110   214
  false,  // 1101 0111   215

  false,  // 1101 1000   216
  false,  // 1101 1001   217
  false,  // 1101 1010   218
  false,  // 1101 1011   219
  false,  // 1101 1100   220
  false,  // 1101 1101   221
  false,  // 1101 1110   222
  false,  // 1101 1111   223

  true,   // 1110 0000   224
  false,  // 1110 0001   225
  false,  // 1110 0010   226
  false,  // 1110 0011   227
  false,  // 1110 0100   228
  false,  // 1110 0101   229
  false,  // 1110 0110   230
  false,  // 1110 0111   231

  false,  // 1110 1000   232
  false,  // 1110 1001   233
  false,  // 1110 1010   234
  false,  // 1110 1011   235
  false,  // 1110 1100   236
  false,  // 1110 1101   237
  false,  // 1110 1110   238
  false,  // 1110 1111   239

  false,  // 1111 0000   240
  false,  // 1111 0001   241
  false,  // 1111 0010   242
  false,  // 1111 0011   243
  false,  // 1111 0100   244
  false,  // 1111 0101   245
  false,  // 1111 0110   246
  false,  // 1111 0111   247

  false,  // 1111 1000   248
  false,  // 1111 1001   249
  false,  // 1111 1010   250
  false,  // 1111 1011   251
  false,  // 1111 1100   252
  false,  // 1111 1101   253
  false,  // 1111 1110   254
  false,  // 1111 1111   255
];


// What would this test be like:
// 1. Create a cell - including its current state
// 2. Mock its neighbors -- do this for all 256 combinations
// 3. Prepare next state
// 4. Transition to next state
// 5. Verify next state
// 6. Reset for next test call


it('calls getNextState', () => {
  // Should this be a mock/stub, etc? 
  const manager = new CellManager(100, 100);

  const getNeighborStatesMock = jest.fn();

  for (let i = 0; i < 256; i++) {
    let returnValArr = [];
    for (let j = 0; j < 8; j++) {
      // Move the bit we're inspecting to the lowest order and compare that bit to 1.
      let curVal = !!((i >> j) & 0x1);
      returnValArr.push(curVal);
    }

    getNeighborStatesMock.mockReturnValueOnce(returnValArr);
  }

  for (let i = 0; i < 256; i++) {
    let returnValArr = [];
    for (let j = 0; j < 8; j++) {
      // Move the bit we're inspecting to the lowest order and compare that bit to 1.
      let curVal = !!((i >> j) & 0x1);
      returnValArr.push(curVal);
    }
    getNeighborStatesMock.mockReturnValueOnce(returnValArr);
  }

  manager.getNeighborStates = getNeighborStatesMock;

  for (let i = 0; i < 256; i++) {
    const cell = new Cell(manager, 10, 10);
    cell.setState(true);
    const expectedResult = expectedResultsForLivingCell[i];
    const nextState = cell.getNextState();
    expect(nextState).toEqual(expectedResult);
  }

  for (let i = 0; i < 256; i++) {
    const cell = new Cell(manager, 10, 10);
    cell.setState(false);
    const expectedResult = expectedResultsForDeadCell[i];
    const nextState = cell.getNextState();
    expect(nextState).toEqual(expectedResult);
  }

});
