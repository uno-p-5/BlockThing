// generated by pgen/main.py
Sk.OpMap = {
"(": Sk.token.tokens.T_LPAR,
")": Sk.token.tokens.T_RPAR,
"[": Sk.token.tokens.T_LSQB,
"]": Sk.token.tokens.T_RSQB,
":": Sk.token.tokens.T_COLON,
",": Sk.token.tokens.T_COMMA,
";": Sk.token.tokens.T_SEMI,
"+": Sk.token.tokens.T_PLUS,
"-": Sk.token.tokens.T_MINUS,
"*": Sk.token.tokens.T_STAR,
"/": Sk.token.tokens.T_SLASH,
"|": Sk.token.tokens.T_VBAR,
"&": Sk.token.tokens.T_AMPER,
"<": Sk.token.tokens.T_LESS,
">": Sk.token.tokens.T_GREATER,
"=": Sk.token.tokens.T_EQUAL,
".": Sk.token.tokens.T_DOT,
"%": Sk.token.tokens.T_PERCENT,
"`": Sk.token.tokens.T_BACKQUOTE,
"{": Sk.token.tokens.T_LBRACE,
"}": Sk.token.tokens.T_RBRACE,
"@": Sk.token.tokens.T_AT,
"==": Sk.token.tokens.T_EQEQUAL,
"!=": Sk.token.tokens.T_NOTEQUAL,
"<>": Sk.token.tokens.T_NOTEQUAL,
"<=": Sk.token.tokens.T_LESSEQUAL,
">=": Sk.token.tokens.T_GREATEREQUAL,
"~": Sk.token.tokens.T_TILDE,
"^": Sk.token.tokens.T_CIRCUMFLEX,
"<<": Sk.token.tokens.T_LEFTSHIFT,
">>": Sk.token.tokens.T_RIGHTSHIFT,
"**": Sk.token.tokens.T_DOUBLESTAR,
"+=": Sk.token.tokens.T_PLUSEQUAL,
"-=": Sk.token.tokens.T_MINEQUAL,
"*=": Sk.token.tokens.T_STAREQUAL,
"/=": Sk.token.tokens.T_SLASHEQUAL,
"%=": Sk.token.tokens.T_PERCENTEQUAL,
"&=": Sk.token.tokens.T_AMPEREQUAL,
"|=": Sk.token.tokens.T_VBAREQUAL,
"^=": Sk.token.tokens.T_CIRCUMFLEXEQUAL,
"<<=": Sk.token.tokens.T_LEFTSHIFTEQUAL,
">>=": Sk.token.tokens.T_RIGHTSHIFTEQUAL,
"**=": Sk.token.tokens.T_DOUBLESTAREQUAL,
"//": Sk.token.tokens.T_DOUBLESLASH,
"//=": Sk.token.tokens.T_DOUBLESLASHEQUAL,
"->": Sk.token.tokens.T_RARROW
};
Sk.ParseTables = {
sym:
{and_expr: 257,
 and_test: 258,
 annassign: 259,
 arglist: 260,
 argument: 261,
 arith_expr: 262,
 assert_stmt: 263,
 async_funcdef: 264,
 async_stmt: 265,
 atom: 266,
 atom_expr: 267,
 augassign: 268,
 break_stmt: 269,
 classdef: 270,
 comp_for: 271,
 comp_if: 272,
 comp_iter: 273,
 comp_op: 274,
 comparison: 275,
 compound_stmt: 276,
 continue_stmt: 277,
 debugger_stmt: 278,
 decorated: 279,
 decorator: 280,
 decorators: 281,
 del_stmt: 282,
 dictorsetmaker: 283,
 dotted_as_name: 284,
 dotted_as_names: 285,
 dotted_name: 286,
 encoding_decl: 287,
 eval_input: 288,
 except_clause: 289,
 expr: 290,
 expr_stmt: 291,
 exprlist: 292,
 factor: 293,
 file_input: 294,
 flow_stmt: 295,
 for_stmt: 296,
 funcdef: 297,
 global_stmt: 298,
 if_stmt: 299,
 import_as_name: 300,
 import_as_names: 301,
 import_from: 302,
 import_name: 303,
 import_stmt: 304,
 lambdef: 305,
 lambdef_nocond: 306,
 nonlocal_stmt: 307,
 not_test: 308,
 or_test: 309,
 parameters: 310,
 pass_stmt: 311,
 power: 312,
 print_stmt: 313,
 raise_stmt: 314,
 return_stmt: 315,
 shift_expr: 316,
 simple_stmt: 317,
 single_input: 256,
 sliceop: 318,
 small_stmt: 319,
 star_expr: 320,
 stmt: 321,
 subscript: 322,
 subscriptlist: 323,
 suite: 324,
 term: 325,
 test: 326,
 test_nocond: 327,
 testlist: 328,
 testlist_comp: 329,
 testlist_star_expr: 330,
 tfpdef: 331,
 trailer: 332,
 try_stmt: 333,
 typedargslist: 334,
 varargslist: 335,
 vfpdef: 336,
 while_stmt: 337,
 with_item: 338,
 with_stmt: 339,
 xor_expr: 340,
 yield_arg: 341,
 yield_expr: 342,
 yield_stmt: 343},
number2symbol:
{256: 'single_input',
 257: 'and_expr',
 258: 'and_test',
 259: 'annassign',
 260: 'arglist',
 261: 'argument',
 262: 'arith_expr',
 263: 'assert_stmt',
 264: 'async_funcdef',
 265: 'async_stmt',
 266: 'atom',
 267: 'atom_expr',
 268: 'augassign',
 269: 'break_stmt',
 270: 'classdef',
 271: 'comp_for',
 272: 'comp_if',
 273: 'comp_iter',
 274: 'comp_op',
 275: 'comparison',
 276: 'compound_stmt',
 277: 'continue_stmt',
 278: 'debugger_stmt',
 279: 'decorated',
 280: 'decorator',
 281: 'decorators',
 282: 'del_stmt',
 283: 'dictorsetmaker',
 284: 'dotted_as_name',
 285: 'dotted_as_names',
 286: 'dotted_name',
 287: 'encoding_decl',
 288: 'eval_input',
 289: 'except_clause',
 290: 'expr',
 291: 'expr_stmt',
 292: 'exprlist',
 293: 'factor',
 294: 'file_input',
 295: 'flow_stmt',
 296: 'for_stmt',
 297: 'funcdef',
 298: 'global_stmt',
 299: 'if_stmt',
 300: 'import_as_name',
 301: 'import_as_names',
 302: 'import_from',
 303: 'import_name',
 304: 'import_stmt',
 305: 'lambdef',
 306: 'lambdef_nocond',
 307: 'nonlocal_stmt',
 308: 'not_test',
 309: 'or_test',
 310: 'parameters',
 311: 'pass_stmt',
 312: 'power',
 313: 'print_stmt',
 314: 'raise_stmt',
 315: 'return_stmt',
 316: 'shift_expr',
 317: 'simple_stmt',
 318: 'sliceop',
 319: 'small_stmt',
 320: 'star_expr',
 321: 'stmt',
 322: 'subscript',
 323: 'subscriptlist',
 324: 'suite',
 325: 'term',
 326: 'test',
 327: 'test_nocond',
 328: 'testlist',
 329: 'testlist_comp',
 330: 'testlist_star_expr',
 331: 'tfpdef',
 332: 'trailer',
 333: 'try_stmt',
 334: 'typedargslist',
 335: 'varargslist',
 336: 'vfpdef',
 337: 'while_stmt',
 338: 'with_item',
 339: 'with_stmt',
 340: 'xor_expr',
 341: 'yield_arg',
 342: 'yield_expr',
 343: 'yield_stmt'},
dfas:
{256: [[[[1, 1], [2, 2], [3, 1]], [[0, 1]], [[3, 1]]],
       {3: 1,
        4: 1,
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
        12: 1,
        13: 1,
        14: 1,
        15: 1,
        16: 1,
        17: 1,
        18: 1,
        19: 1,
        20: 1,
        21: 1,
        22: 1,
        23: 1,
        24: 1,
        25: 1,
        26: 1,
        27: 1,
        28: 1,
        29: 1,
        30: 1,
        31: 1,
        32: 1,
        33: 1,
        34: 1,
        35: 1,
        36: 1,
        37: 1,
        38: 1,
        39: 1,
        40: 1,
        41: 1,
        42: 1,
        43: 1}],
 257: [[[[44, 1]], [[45, 0], [0, 1]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 258: [[[[46, 1]], [[47, 0], [0, 1]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 259: [[[[48, 1]], [[49, 2]], [[50, 3], [0, 2]], [[49, 4]], [[0, 4]]], {48: 1}],
 260: [[[[51, 1]], [[52, 2], [0, 1]], [[51, 1], [0, 2]]],
       {10: 1,
        11: 1,
        13: 1,
        15: 1,
        19: 1,
        22: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1,
        53: 1}],
 261: [[[[10, 1], [53, 1], [49, 2]],
        [[49, 3]],
        [[50, 1], [54, 3], [0, 2]],
        [[0, 3]]],
       {10: 1,
        11: 1,
        13: 1,
        15: 1,
        19: 1,
        22: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1,
        53: 1}],
 262: [[[[55, 1]], [[26, 0], [19, 0], [0, 1]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 263: [[[[37, 1]], [[49, 2]], [[52, 3], [0, 2]], [[49, 4]], [[0, 4]]], {37: 1}],
 264: [[[[18, 1]], [[56, 2]], [[0, 2]]], {18: 1}],
 265: [[[[18, 1]], [[57, 2], [56, 2], [58, 2]], [[0, 2]]], {18: 1}],
 266: [[[[35, 1],
         [23, 2],
         [13, 2],
         [25, 3],
         [42, 5],
         [28, 2],
         [29, 4],
         [32, 2],
         [39, 2],
         [34, 2]],
        [[35, 1], [0, 1]],
        [[0, 2]],
        [[59, 6], [60, 2], [61, 6]],
        [[62, 7], [63, 2]],
        [[59, 8], [64, 2]],
        [[60, 2]],
        [[63, 2]],
        [[64, 2]]],
       {13: 1, 23: 1, 25: 1, 28: 1, 29: 1, 32: 1, 34: 1, 35: 1, 39: 1, 42: 1}],
 267: [[[[15, 1], [65, 2]], [[65, 2]], [[66, 2], [0, 2]]],
       {13: 1,
        15: 1,
        23: 1,
        25: 1,
        28: 1,
        29: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 268: [[[[67, 1],
         [68, 1],
         [69, 1],
         [70, 1],
         [71, 1],
         [72, 1],
         [73, 1],
         [74, 1],
         [75, 1],
         [76, 1],
         [77, 1],
         [78, 1],
         [79, 1]],
        [[0, 1]]],
       {67: 1,
        68: 1,
        69: 1,
        70: 1,
        71: 1,
        72: 1,
        73: 1,
        74: 1,
        75: 1,
        76: 1,
        77: 1,
        78: 1,
        79: 1}],
 269: [[[[4, 1]], [[0, 1]]], {4: 1}],
 270: [[[[43, 1]],
        [[28, 2]],
        [[48, 4], [25, 3]],
        [[80, 5], [60, 6]],
        [[81, 7]],
        [[60, 6]],
        [[48, 4]],
        [[0, 7]]],
       {43: 1}],
 271: [[[[33, 2], [18, 1]],
        [[33, 2]],
        [[82, 3]],
        [[83, 4]],
        [[84, 5]],
        [[85, 6], [0, 5]],
        [[0, 6]]],
       {18: 1, 33: 1}],
 272: [[[[7, 1]], [[86, 2]], [[85, 3], [0, 2]], [[0, 3]]], {7: 1}],
 273: [[[[87, 1], [54, 1]], [[0, 1]]], {7: 1, 18: 1, 33: 1}],
 274: [[[[88, 1],
         [89, 1],
         [90, 1],
         [91, 1],
         [30, 2],
         [83, 1],
         [92, 1],
         [92, 1],
         [93, 3],
         [94, 1]],
        [[0, 1]],
        [[83, 1]],
        [[30, 1], [0, 3]]],
       {30: 1, 83: 1, 88: 1, 89: 1, 90: 1, 91: 1, 92: 1, 93: 1, 94: 1}],
 275: [[[[95, 1]], [[96, 0], [0, 1]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 276: [[[[97, 1],
         [57, 1],
         [98, 1],
         [99, 1],
         [56, 1],
         [100, 1],
         [101, 1],
         [58, 1],
         [102, 1]],
        [[0, 1]]],
       {5: 1, 7: 1, 9: 1, 12: 1, 18: 1, 21: 1, 31: 1, 33: 1, 43: 1}],
 277: [[[[14, 1]], [[0, 1]]], {14: 1}],
 278: [[[[24, 1]], [[0, 1]]], {24: 1}],
 279: [[[[103, 1]], [[100, 2], [104, 2], [56, 2]], [[0, 2]]], {5: 1}],
 280: [[[[5, 1]],
        [[105, 2]],
        [[3, 3], [25, 4]],
        [[0, 3]],
        [[80, 5], [60, 6]],
        [[60, 6]],
        [[3, 3]]],
       {5: 1}],
 281: [[[[106, 1]], [[106, 1], [0, 1]]], {5: 1}],
 282: [[[[16, 1]], [[82, 2]], [[0, 2]]], {16: 1}],
 283: [[[[53, 1], [107, 2], [49, 3]],
        [[95, 4]],
        [[52, 5], [54, 6], [0, 2]],
        [[52, 5], [48, 7], [54, 6], [0, 3]],
        [[52, 8], [54, 6], [0, 4]],
        [[107, 9], [49, 9], [0, 5]],
        [[0, 6]],
        [[49, 4]],
        [[53, 10], [49, 11], [0, 8]],
        [[52, 5], [0, 9]],
        [[95, 12]],
        [[48, 13]],
        [[52, 8], [0, 12]],
        [[49, 12]]],
       {10: 1,
        11: 1,
        13: 1,
        15: 1,
        19: 1,
        22: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1,
        53: 1}],
 284: [[[[105, 1]], [[108, 2], [0, 1]], [[28, 3]], [[0, 3]]], {28: 1}],
 285: [[[[109, 1]], [[52, 0], [0, 1]]], {28: 1}],
 286: [[[[28, 1]], [[110, 0], [0, 1]]], {28: 1}],
 287: [[[[28, 1]], [[0, 1]]], {28: 1}],
 288: [[[[111, 1]], [[3, 1], [112, 2]], [[0, 2]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        22: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 289: [[[[113, 1]],
        [[49, 2], [0, 1]],
        [[52, 3], [108, 3], [0, 2]],
        [[49, 4]],
        [[0, 4]]],
       {113: 1}],
 290: [[[[114, 1]], [[115, 0], [0, 1]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 291: [[[[116, 1]],
        [[50, 2], [117, 3], [118, 4], [0, 1]],
        [[61, 5], [116, 5]],
        [[61, 4], [111, 4]],
        [[0, 4]],
        [[50, 2], [0, 5]]],
       {10: 1,
        11: 1,
        13: 1,
        15: 1,
        19: 1,
        22: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 292: [[[[95, 1], [107, 1]], [[52, 2], [0, 1]], [[95, 1], [107, 1], [0, 2]]],
       {10: 1,
        11: 1,
        13: 1,
        15: 1,
        19: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 293: [[[[26, 1], [11, 1], [19, 1], [119, 2]], [[120, 2]], [[0, 2]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 294: [[[[3, 0], [121, 0], [112, 1]], [[0, 1]]],
       {3: 1,
        4: 1,
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
        12: 1,
        13: 1,
        14: 1,
        15: 1,
        16: 1,
        17: 1,
        18: 1,
        19: 1,
        20: 1,
        21: 1,
        22: 1,
        23: 1,
        24: 1,
        25: 1,
        26: 1,
        27: 1,
        28: 1,
        29: 1,
        30: 1,
        31: 1,
        32: 1,
        33: 1,
        34: 1,
        35: 1,
        36: 1,
        37: 1,
        38: 1,
        39: 1,
        40: 1,
        41: 1,
        42: 1,
        43: 1,
        112: 1}],
 295: [[[[122, 1], [123, 1], [124, 1], [125, 1], [126, 1]], [[0, 1]]],
       {4: 1, 8: 1, 14: 1, 20: 1, 36: 1}],
 296: [[[[33, 1]],
        [[82, 2]],
        [[83, 3]],
        [[111, 4]],
        [[48, 5]],
        [[81, 6]],
        [[127, 7], [0, 6]],
        [[48, 8]],
        [[81, 9]],
        [[0, 9]]],
       {33: 1}],
 297: [[[[12, 1]],
        [[28, 2]],
        [[128, 3]],
        [[129, 4], [48, 5]],
        [[49, 6]],
        [[81, 7]],
        [[48, 5]],
        [[0, 7]]],
       {12: 1}],
 298: [[[[38, 1]], [[28, 2]], [[52, 1], [0, 2]]], {38: 1}],
 299: [[[[7, 1]],
        [[49, 2]],
        [[48, 3]],
        [[81, 4]],
        [[127, 5], [130, 1], [0, 4]],
        [[48, 6]],
        [[81, 7]],
        [[0, 7]]],
       {7: 1}],
 300: [[[[28, 1]], [[108, 2], [0, 1]], [[28, 3]], [[0, 3]]], {28: 1}],
 301: [[[[131, 1]], [[52, 2], [0, 1]], [[131, 1], [0, 2]]], {28: 1}],
 302: [[[[17, 1]],
        [[105, 2], [110, 3], [39, 3]],
        [[27, 4]],
        [[105, 2], [27, 4], [39, 3], [110, 3]],
        [[10, 5], [25, 6], [132, 5]],
        [[0, 5]],
        [[132, 7]],
        [[60, 5]]],
       {17: 1}],
 303: [[[[27, 1]], [[133, 2]], [[0, 2]]], {27: 1}],
 304: [[[[134, 1], [135, 1]], [[0, 1]]], {17: 1, 27: 1}],
 305: [[[[22, 1]], [[48, 2], [136, 3]], [[49, 4]], [[48, 2]], [[0, 4]]],
       {22: 1}],
 306: [[[[22, 1]], [[48, 2], [136, 3]], [[86, 4]], [[48, 2]], [[0, 4]]],
       {22: 1}],
 307: [[[[40, 1]], [[28, 2]], [[52, 1], [0, 2]]], {40: 1}],
 308: [[[[137, 1], [30, 2]], [[0, 1]], [[46, 1]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 309: [[[[138, 1]], [[139, 0], [0, 1]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 310: [[[[25, 1]], [[60, 2], [140, 3]], [[0, 2]], [[60, 2]]], {25: 1}],
 311: [[[[6, 1]], [[0, 1]]], {6: 1}],
 312: [[[[141, 1]], [[53, 2], [0, 1]], [[120, 3]], [[0, 3]]],
       {13: 1,
        15: 1,
        23: 1,
        25: 1,
        28: 1,
        29: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 313: [[[[41, 1]],
        [[142, 2], [49, 3], [0, 1]],
        [[49, 4]],
        [[52, 5], [0, 3]],
        [[52, 6], [0, 4]],
        [[49, 3], [0, 5]],
        [[49, 7]],
        [[52, 8], [0, 7]],
        [[49, 7], [0, 8]]],
       {41: 1}],
 314: [[[[20, 1]],
        [[49, 2], [0, 1]],
        [[52, 3], [17, 3], [0, 2]],
        [[49, 4]],
        [[52, 5], [0, 4]],
        [[49, 6]],
        [[0, 6]]],
       {20: 1}],
 315: [[[[36, 1]], [[111, 2], [0, 1]], [[0, 2]]], {36: 1}],
 316: [[[[143, 1]], [[144, 0], [142, 0], [0, 1]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 317: [[[[145, 1]], [[3, 2], [146, 3]], [[0, 2]], [[3, 2], [145, 1]]],
       {4: 1,
        6: 1,
        8: 1,
        10: 1,
        11: 1,
        13: 1,
        14: 1,
        15: 1,
        16: 1,
        17: 1,
        19: 1,
        20: 1,
        22: 1,
        23: 1,
        24: 1,
        25: 1,
        26: 1,
        27: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        36: 1,
        37: 1,
        38: 1,
        39: 1,
        40: 1,
        41: 1,
        42: 1}],
 318: [[[[48, 1]], [[49, 2], [0, 1]], [[0, 2]]], {48: 1}],
 319: [[[[147, 1],
         [148, 1],
         [149, 1],
         [150, 1],
         [151, 1],
         [152, 1],
         [153, 1],
         [154, 1],
         [155, 1],
         [156, 1]],
        [[0, 1]]],
       {4: 1,
        6: 1,
        8: 1,
        10: 1,
        11: 1,
        13: 1,
        14: 1,
        15: 1,
        16: 1,
        17: 1,
        19: 1,
        20: 1,
        22: 1,
        23: 1,
        24: 1,
        25: 1,
        26: 1,
        27: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        36: 1,
        37: 1,
        38: 1,
        39: 1,
        40: 1,
        41: 1,
        42: 1}],
 320: [[[[10, 1]], [[95, 2]], [[0, 2]]], {10: 1}],
 321: [[[[1, 1], [2, 1]], [[0, 1]]],
       {4: 1,
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
        12: 1,
        13: 1,
        14: 1,
        15: 1,
        16: 1,
        17: 1,
        18: 1,
        19: 1,
        20: 1,
        21: 1,
        22: 1,
        23: 1,
        24: 1,
        25: 1,
        26: 1,
        27: 1,
        28: 1,
        29: 1,
        30: 1,
        31: 1,
        32: 1,
        33: 1,
        34: 1,
        35: 1,
        36: 1,
        37: 1,
        38: 1,
        39: 1,
        40: 1,
        41: 1,
        42: 1,
        43: 1}],
 322: [[[[48, 1], [49, 2]],
        [[157, 3], [49, 4], [0, 1]],
        [[48, 1], [0, 2]],
        [[0, 3]],
        [[157, 3], [0, 4]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        22: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1,
        48: 1}],
 323: [[[[158, 1]], [[52, 2], [0, 1]], [[158, 1], [0, 2]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        22: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1,
        48: 1}],
 324: [[[[3, 1], [1, 2]],
        [[159, 3]],
        [[0, 2]],
        [[121, 4]],
        [[160, 2], [121, 4]]],
       {3: 1,
        4: 1,
        6: 1,
        8: 1,
        10: 1,
        11: 1,
        13: 1,
        14: 1,
        15: 1,
        16: 1,
        17: 1,
        19: 1,
        20: 1,
        22: 1,
        23: 1,
        24: 1,
        25: 1,
        26: 1,
        27: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        36: 1,
        37: 1,
        38: 1,
        39: 1,
        40: 1,
        41: 1,
        42: 1}],
 325: [[[[120, 1]], [[5, 0], [10, 0], [161, 0], [162, 0], [163, 0], [0, 1]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 326: [[[[84, 2], [164, 1]],
        [[0, 1]],
        [[7, 3], [0, 2]],
        [[84, 4]],
        [[127, 5]],
        [[49, 1]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        22: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 327: [[[[165, 1], [84, 1]], [[0, 1]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        22: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 328: [[[[49, 1]], [[52, 2], [0, 1]], [[49, 1], [0, 2]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        22: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 329: [[[[107, 1], [49, 1]],
        [[52, 2], [54, 3], [0, 1]],
        [[107, 4], [49, 4], [0, 2]],
        [[0, 3]],
        [[52, 2], [0, 4]]],
       {10: 1,
        11: 1,
        13: 1,
        15: 1,
        19: 1,
        22: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 330: [[[[107, 1], [49, 1]], [[52, 2], [0, 1]], [[107, 1], [49, 1], [0, 2]]],
       {10: 1,
        11: 1,
        13: 1,
        15: 1,
        19: 1,
        22: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 331: [[[[28, 1]], [[48, 2], [0, 1]], [[49, 3]], [[0, 3]]], {28: 1}],
 332: [[[[25, 1], [42, 3], [110, 2]],
        [[80, 4], [60, 5]],
        [[28, 5]],
        [[166, 6]],
        [[60, 5]],
        [[0, 5]],
        [[64, 5]]],
       {25: 1, 42: 1, 110: 1}],
 333: [[[[21, 1]],
        [[48, 2]],
        [[81, 3]],
        [[167, 4], [168, 5]],
        [[48, 6]],
        [[48, 7]],
        [[81, 8]],
        [[81, 9]],
        [[127, 10], [167, 4], [168, 5], [0, 8]],
        [[0, 9]],
        [[48, 11]],
        [[81, 12]],
        [[168, 5], [0, 12]]],
       {21: 1}],
 334: [[[[169, 1], [10, 2], [53, 3]],
        [[50, 4], [52, 5], [0, 1]],
        [[169, 6], [52, 7], [0, 2]],
        [[169, 8]],
        [[49, 9]],
        [[169, 1], [53, 3], [10, 10], [0, 5]],
        [[52, 7], [0, 6]],
        [[169, 11], [53, 3], [0, 7]],
        [[52, 12], [0, 8]],
        [[52, 5], [0, 9]],
        [[169, 13], [52, 14], [0, 10]],
        [[50, 15], [52, 7], [0, 11]],
        [[0, 12]],
        [[52, 14], [0, 13]],
        [[169, 16], [53, 3], [0, 14]],
        [[49, 6]],
        [[50, 17], [52, 14], [0, 16]],
        [[49, 13]]],
       {10: 1, 28: 1, 53: 1}],
 335: [[[[53, 1], [170, 2], [10, 3]],
        [[170, 4]],
        [[52, 5], [50, 6], [0, 2]],
        [[52, 7], [170, 8], [0, 3]],
        [[52, 9], [0, 4]],
        [[10, 10], [170, 2], [53, 1], [0, 5]],
        [[49, 11]],
        [[53, 1], [170, 12], [0, 7]],
        [[52, 7], [0, 8]],
        [[0, 9]],
        [[52, 13], [170, 14], [0, 10]],
        [[52, 5], [0, 11]],
        [[52, 7], [50, 15], [0, 12]],
        [[53, 1], [170, 16], [0, 13]],
        [[52, 13], [0, 14]],
        [[49, 8]],
        [[50, 17], [52, 13], [0, 16]],
        [[49, 14]]],
       {10: 1, 28: 1, 53: 1}],
 336: [[[[28, 1]], [[0, 1]]], {28: 1}],
 337: [[[[9, 1]],
        [[49, 2]],
        [[48, 3]],
        [[81, 4]],
        [[127, 5], [0, 4]],
        [[48, 6]],
        [[81, 7]],
        [[0, 7]]],
       {9: 1}],
 338: [[[[49, 1]], [[108, 2], [0, 1]], [[95, 3]], [[0, 3]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        22: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 339: [[[[31, 1]], [[171, 2]], [[52, 1], [48, 3]], [[81, 4]], [[0, 4]]],
       {31: 1}],
 340: [[[[172, 1]], [[173, 0], [0, 1]]],
       {11: 1,
        13: 1,
        15: 1,
        19: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 341: [[[[17, 1], [111, 2]], [[49, 2]], [[0, 2]]],
       {11: 1,
        13: 1,
        15: 1,
        17: 1,
        19: 1,
        22: 1,
        23: 1,
        25: 1,
        26: 1,
        28: 1,
        29: 1,
        30: 1,
        32: 1,
        34: 1,
        35: 1,
        39: 1,
        42: 1}],
 342: [[[[8, 1]], [[174, 2], [0, 1]], [[0, 2]]], {8: 1}],
 343: [[[[61, 1]], [[0, 1]]], {8: 1}]},
states:
[[[[1, 1], [2, 2], [3, 1]], [[0, 1]], [[3, 1]]],
 [[[44, 1]], [[45, 0], [0, 1]]],
 [[[46, 1]], [[47, 0], [0, 1]]],
 [[[48, 1]], [[49, 2]], [[50, 3], [0, 2]], [[49, 4]], [[0, 4]]],
 [[[51, 1]], [[52, 2], [0, 1]], [[51, 1], [0, 2]]],
 [[[10, 1], [53, 1], [49, 2]], [[49, 3]], [[50, 1], [54, 3], [0, 2]], [[0, 3]]],
 [[[55, 1]], [[26, 0], [19, 0], [0, 1]]],
 [[[37, 1]], [[49, 2]], [[52, 3], [0, 2]], [[49, 4]], [[0, 4]]],
 [[[18, 1]], [[56, 2]], [[0, 2]]],
 [[[18, 1]], [[57, 2], [56, 2], [58, 2]], [[0, 2]]],
 [[[35, 1],
   [23, 2],
   [13, 2],
   [25, 3],
   [42, 5],
   [28, 2],
   [29, 4],
   [32, 2],
   [39, 2],
   [34, 2]],
  [[35, 1], [0, 1]],
  [[0, 2]],
  [[59, 6], [60, 2], [61, 6]],
  [[62, 7], [63, 2]],
  [[59, 8], [64, 2]],
  [[60, 2]],
  [[63, 2]],
  [[64, 2]]],
 [[[15, 1], [65, 2]], [[65, 2]], [[66, 2], [0, 2]]],
 [[[67, 1],
   [68, 1],
   [69, 1],
   [70, 1],
   [71, 1],
   [72, 1],
   [73, 1],
   [74, 1],
   [75, 1],
   [76, 1],
   [77, 1],
   [78, 1],
   [79, 1]],
  [[0, 1]]],
 [[[4, 1]], [[0, 1]]],
 [[[43, 1]],
  [[28, 2]],
  [[48, 4], [25, 3]],
  [[80, 5], [60, 6]],
  [[81, 7]],
  [[60, 6]],
  [[48, 4]],
  [[0, 7]]],
 [[[33, 2], [18, 1]],
  [[33, 2]],
  [[82, 3]],
  [[83, 4]],
  [[84, 5]],
  [[85, 6], [0, 5]],
  [[0, 6]]],
 [[[7, 1]], [[86, 2]], [[85, 3], [0, 2]], [[0, 3]]],
 [[[87, 1], [54, 1]], [[0, 1]]],
 [[[88, 1],
   [89, 1],
   [90, 1],
   [91, 1],
   [30, 2],
   [83, 1],
   [92, 1],
   [92, 1],
   [93, 3],
   [94, 1]],
  [[0, 1]],
  [[83, 1]],
  [[30, 1], [0, 3]]],
 [[[95, 1]], [[96, 0], [0, 1]]],
 [[[97, 1],
   [57, 1],
   [98, 1],
   [99, 1],
   [56, 1],
   [100, 1],
   [101, 1],
   [58, 1],
   [102, 1]],
  [[0, 1]]],
 [[[14, 1]], [[0, 1]]],
 [[[24, 1]], [[0, 1]]],
 [[[103, 1]], [[100, 2], [104, 2], [56, 2]], [[0, 2]]],
 [[[5, 1]],
  [[105, 2]],
  [[3, 3], [25, 4]],
  [[0, 3]],
  [[80, 5], [60, 6]],
  [[60, 6]],
  [[3, 3]]],
 [[[106, 1]], [[106, 1], [0, 1]]],
 [[[16, 1]], [[82, 2]], [[0, 2]]],
 [[[53, 1], [107, 2], [49, 3]],
  [[95, 4]],
  [[52, 5], [54, 6], [0, 2]],
  [[52, 5], [48, 7], [54, 6], [0, 3]],
  [[52, 8], [54, 6], [0, 4]],
  [[107, 9], [49, 9], [0, 5]],
  [[0, 6]],
  [[49, 4]],
  [[53, 10], [49, 11], [0, 8]],
  [[52, 5], [0, 9]],
  [[95, 12]],
  [[48, 13]],
  [[52, 8], [0, 12]],
  [[49, 12]]],
 [[[105, 1]], [[108, 2], [0, 1]], [[28, 3]], [[0, 3]]],
 [[[109, 1]], [[52, 0], [0, 1]]],
 [[[28, 1]], [[110, 0], [0, 1]]],
 [[[28, 1]], [[0, 1]]],
 [[[111, 1]], [[3, 1], [112, 2]], [[0, 2]]],
 [[[113, 1]],
  [[49, 2], [0, 1]],
  [[52, 3], [108, 3], [0, 2]],
  [[49, 4]],
  [[0, 4]]],
 [[[114, 1]], [[115, 0], [0, 1]]],
 [[[116, 1]],
  [[50, 2], [117, 3], [118, 4], [0, 1]],
  [[61, 5], [116, 5]],
  [[61, 4], [111, 4]],
  [[0, 4]],
  [[50, 2], [0, 5]]],
 [[[95, 1], [107, 1]], [[52, 2], [0, 1]], [[95, 1], [107, 1], [0, 2]]],
 [[[26, 1], [11, 1], [19, 1], [119, 2]], [[120, 2]], [[0, 2]]],
 [[[3, 0], [121, 0], [112, 1]], [[0, 1]]],
 [[[122, 1], [123, 1], [124, 1], [125, 1], [126, 1]], [[0, 1]]],
 [[[33, 1]],
  [[82, 2]],
  [[83, 3]],
  [[111, 4]],
  [[48, 5]],
  [[81, 6]],
  [[127, 7], [0, 6]],
  [[48, 8]],
  [[81, 9]],
  [[0, 9]]],
 [[[12, 1]],
  [[28, 2]],
  [[128, 3]],
  [[129, 4], [48, 5]],
  [[49, 6]],
  [[81, 7]],
  [[48, 5]],
  [[0, 7]]],
 [[[38, 1]], [[28, 2]], [[52, 1], [0, 2]]],
 [[[7, 1]],
  [[49, 2]],
  [[48, 3]],
  [[81, 4]],
  [[127, 5], [130, 1], [0, 4]],
  [[48, 6]],
  [[81, 7]],
  [[0, 7]]],
 [[[28, 1]], [[108, 2], [0, 1]], [[28, 3]], [[0, 3]]],
 [[[131, 1]], [[52, 2], [0, 1]], [[131, 1], [0, 2]]],
 [[[17, 1]],
  [[105, 2], [110, 3], [39, 3]],
  [[27, 4]],
  [[105, 2], [27, 4], [39, 3], [110, 3]],
  [[10, 5], [25, 6], [132, 5]],
  [[0, 5]],
  [[132, 7]],
  [[60, 5]]],
 [[[27, 1]], [[133, 2]], [[0, 2]]],
 [[[134, 1], [135, 1]], [[0, 1]]],
 [[[22, 1]], [[48, 2], [136, 3]], [[49, 4]], [[48, 2]], [[0, 4]]],
 [[[22, 1]], [[48, 2], [136, 3]], [[86, 4]], [[48, 2]], [[0, 4]]],
 [[[40, 1]], [[28, 2]], [[52, 1], [0, 2]]],
 [[[137, 1], [30, 2]], [[0, 1]], [[46, 1]]],
 [[[138, 1]], [[139, 0], [0, 1]]],
 [[[25, 1]], [[60, 2], [140, 3]], [[0, 2]], [[60, 2]]],
 [[[6, 1]], [[0, 1]]],
 [[[141, 1]], [[53, 2], [0, 1]], [[120, 3]], [[0, 3]]],
 [[[41, 1]],
  [[142, 2], [49, 3], [0, 1]],
  [[49, 4]],
  [[52, 5], [0, 3]],
  [[52, 6], [0, 4]],
  [[49, 3], [0, 5]],
  [[49, 7]],
  [[52, 8], [0, 7]],
  [[49, 7], [0, 8]]],
 [[[20, 1]],
  [[49, 2], [0, 1]],
  [[52, 3], [17, 3], [0, 2]],
  [[49, 4]],
  [[52, 5], [0, 4]],
  [[49, 6]],
  [[0, 6]]],
 [[[36, 1]], [[111, 2], [0, 1]], [[0, 2]]],
 [[[143, 1]], [[144, 0], [142, 0], [0, 1]]],
 [[[145, 1]], [[3, 2], [146, 3]], [[0, 2]], [[3, 2], [145, 1]]],
 [[[48, 1]], [[49, 2], [0, 1]], [[0, 2]]],
 [[[147, 1],
   [148, 1],
   [149, 1],
   [150, 1],
   [151, 1],
   [152, 1],
   [153, 1],
   [154, 1],
   [155, 1],
   [156, 1]],
  [[0, 1]]],
 [[[10, 1]], [[95, 2]], [[0, 2]]],
 [[[1, 1], [2, 1]], [[0, 1]]],
 [[[48, 1], [49, 2]],
  [[157, 3], [49, 4], [0, 1]],
  [[48, 1], [0, 2]],
  [[0, 3]],
  [[157, 3], [0, 4]]],
 [[[158, 1]], [[52, 2], [0, 1]], [[158, 1], [0, 2]]],
 [[[3, 1], [1, 2]], [[159, 3]], [[0, 2]], [[121, 4]], [[160, 2], [121, 4]]],
 [[[120, 1]], [[5, 0], [10, 0], [161, 0], [162, 0], [163, 0], [0, 1]]],
 [[[84, 2], [164, 1]],
  [[0, 1]],
  [[7, 3], [0, 2]],
  [[84, 4]],
  [[127, 5]],
  [[49, 1]]],
 [[[165, 1], [84, 1]], [[0, 1]]],
 [[[49, 1]], [[52, 2], [0, 1]], [[49, 1], [0, 2]]],
 [[[107, 1], [49, 1]],
  [[52, 2], [54, 3], [0, 1]],
  [[107, 4], [49, 4], [0, 2]],
  [[0, 3]],
  [[52, 2], [0, 4]]],
 [[[107, 1], [49, 1]], [[52, 2], [0, 1]], [[107, 1], [49, 1], [0, 2]]],
 [[[28, 1]], [[48, 2], [0, 1]], [[49, 3]], [[0, 3]]],
 [[[25, 1], [42, 3], [110, 2]],
  [[80, 4], [60, 5]],
  [[28, 5]],
  [[166, 6]],
  [[60, 5]],
  [[0, 5]],
  [[64, 5]]],
 [[[21, 1]],
  [[48, 2]],
  [[81, 3]],
  [[167, 4], [168, 5]],
  [[48, 6]],
  [[48, 7]],
  [[81, 8]],
  [[81, 9]],
  [[127, 10], [167, 4], [168, 5], [0, 8]],
  [[0, 9]],
  [[48, 11]],
  [[81, 12]],
  [[168, 5], [0, 12]]],
 [[[169, 1], [10, 2], [53, 3]],
  [[50, 4], [52, 5], [0, 1]],
  [[169, 6], [52, 7], [0, 2]],
  [[169, 8]],
  [[49, 9]],
  [[169, 1], [53, 3], [10, 10], [0, 5]],
  [[52, 7], [0, 6]],
  [[169, 11], [53, 3], [0, 7]],
  [[52, 12], [0, 8]],
  [[52, 5], [0, 9]],
  [[169, 13], [52, 14], [0, 10]],
  [[50, 15], [52, 7], [0, 11]],
  [[0, 12]],
  [[52, 14], [0, 13]],
  [[169, 16], [53, 3], [0, 14]],
  [[49, 6]],
  [[50, 17], [52, 14], [0, 16]],
  [[49, 13]]],
 [[[53, 1], [170, 2], [10, 3]],
  [[170, 4]],
  [[52, 5], [50, 6], [0, 2]],
  [[52, 7], [170, 8], [0, 3]],
  [[52, 9], [0, 4]],
  [[10, 10], [170, 2], [53, 1], [0, 5]],
  [[49, 11]],
  [[53, 1], [170, 12], [0, 7]],
  [[52, 7], [0, 8]],
  [[0, 9]],
  [[52, 13], [170, 14], [0, 10]],
  [[52, 5], [0, 11]],
  [[52, 7], [50, 15], [0, 12]],
  [[53, 1], [170, 16], [0, 13]],
  [[52, 13], [0, 14]],
  [[49, 8]],
  [[50, 17], [52, 13], [0, 16]],
  [[49, 14]]],
 [[[28, 1]], [[0, 1]]],
 [[[9, 1]],
  [[49, 2]],
  [[48, 3]],
  [[81, 4]],
  [[127, 5], [0, 4]],
  [[48, 6]],
  [[81, 7]],
  [[0, 7]]],
 [[[49, 1]], [[108, 2], [0, 1]], [[95, 3]], [[0, 3]]],
 [[[31, 1]], [[171, 2]], [[52, 1], [48, 3]], [[81, 4]], [[0, 4]]],
 [[[172, 1]], [[173, 0], [0, 1]]],
 [[[17, 1], [111, 2]], [[49, 2]], [[0, 2]]],
 [[[8, 1]], [[174, 2], [0, 1]], [[0, 2]]],
 [[[61, 1]], [[0, 1]]]],
labels:
[[0, 'EMPTY'],
 [317, null],
 [276, null],
 [4, null],
 [1, 'break'],
 [49, null],
 [1, 'pass'],
 [1, 'if'],
 [1, 'yield'],
 [1, 'while'],
 [16, null],
 [31, null],
 [1, 'def'],
 [1, 'null'],
 [1, 'continue'],
 [54, null],
 [1, 'del'],
 [1, 'from'],
 [55, null],
 [14, null],
 [1, 'raise'],
 [1, 'try'],
 [1, 'lambda'],
 [1, 'False'],
 [1, 'debugger'],
 [7, null],
 [15, null],
 [1, 'import'],
 [1, null],
 [25, null],
 [1, 'not'],
 [1, 'with'],
 [1, 'True'],
 [1, 'for'],
 [2, null],
 [3, null],
 [1, 'return'],
 [1, 'assert'],
 [1, 'global'],
 [52, null],
 [1, 'nonlocal'],
 [1, 'print'],
 [9, null],
 [1, 'class'],
 [316, null],
 [19, null],
 [308, null],
 [1, 'and'],
 [11, null],
 [326, null],
 [22, null],
 [261, null],
 [12, null],
 [35, null],
 [271, null],
 [325, null],
 [297, null],
 [339, null],
 [296, null],
 [329, null],
 [8, null],
 [342, null],
 [283, null],
 [26, null],
 [10, null],
 [266, null],
 [332, null],
 [45, null],
 [40, null],
 [41, null],
 [44, null],
 [37, null],
 [39, null],
 [36, null],
 [43, null],
 [50, null],
 [46, null],
 [42, null],
 [38, null],
 [48, null],
 [260, null],
 [324, null],
 [292, null],
 [1, 'in'],
 [309, null],
 [273, null],
 [327, null],
 [272, null],
 [29, null],
 [30, null],
 [27, null],
 [20, null],
 [28, null],
 [1, 'is'],
 [21, null],
 [290, null],
 [274, null],
 [265, null],
 [333, null],
 [279, null],
 [270, null],
 [299, null],
 [337, null],
 [281, null],
 [264, null],
 [286, null],
 [280, null],
 [320, null],
 [1, 'as'],
 [284, null],
 [23, null],
 [328, null],
 [0, null],
 [1, 'except'],
 [340, null],
 [18, null],
 [330, null],
 [268, null],
 [259, null],
 [312, null],
 [293, null],
 [321, null],
 [315, null],
 [343, null],
 [269, null],
 [277, null],
 [314, null],
 [1, 'else'],
 [310, null],
 [51, null],
 [1, 'elif'],
 [300, null],
 [301, null],
 [285, null],
 [302, null],
 [303, null],
 [335, null],
 [275, null],
 [258, null],
 [1, 'or'],
 [334, null],
 [267, null],
 [34, null],
 [262, null],
 [33, null],
 [319, null],
 [13, null],
 [307, null],
 [291, null],
 [304, null],
 [263, null],
 [278, null],
 [298, null],
 [311, null],
 [282, null],
 [295, null],
 [313, null],
 [318, null],
 [322, null],
 [5, null],
 [6, null],
 [24, null],
 [47, null],
 [17, null],
 [305, null],
 [306, null],
 [323, null],
 [289, null],
 [1, 'finally'],
 [331, null],
 [336, null],
 [338, null],
 [257, null],
 [32, null],
 [341, null]],
keywords:
{'False': 23,
 'null': 13,
 'True': 32,
 'and': 47,
 'as': 108,
 'assert': 37,
 'break': 4,
 'class': 43,
 'continue': 14,
 'debugger': 24,
 'def': 12,
 'del': 16,
 'elif': 130,
 'else': 127,
 'except': 113,
 'finally': 168,
 'for': 33,
 'from': 17,
 'global': 38,
 'if': 7,
 'import': 27,
 'in': 83,
 'is': 93,
 'lambda': 22,
 'nonlocal': 40,
 'not': 30,
 'or': 139,
 'pass': 6,
 'print': 41,
 'raise': 20,
 'return': 36,
 'try': 21,
 'while': 9,
 'with': 31,
 'yield': 8},
tokens:
{0: 112,
 1: 28,
 2: 34,
 3: 35,
 4: 3,
 5: 159,
 6: 160,
 7: 25,
 8: 60,
 9: 42,
 10: 64,
 11: 48,
 12: 52,
 13: 146,
 14: 19,
 15: 26,
 16: 10,
 17: 163,
 18: 115,
 19: 45,
 20: 91,
 21: 94,
 22: 50,
 23: 110,
 24: 161,
 25: 29,
 26: 63,
 27: 90,
 28: 92,
 29: 88,
 30: 89,
 31: 11,
 32: 173,
 33: 144,
 34: 142,
 35: 53,
 36: 73,
 37: 71,
 38: 78,
 39: 72,
 40: 68,
 41: 69,
 42: 77,
 43: 74,
 44: 70,
 45: 67,
 46: 76,
 47: 162,
 48: 79,
 49: 5,
 50: 75,
 51: 129,
 52: 39,
 54: 15,
 55: 18},
start: 256
};