/* glitch text generator scripts, version 1.02
by stAllio!
last revised: february 1, 2014

check the following for updates, documentation, etc:
http://animalswithinanimals.com/generator/

*/

String.prototype.splice = function (idx, rem, s) {
    // inserts s at point idx in a string
    return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
};

String.prototype.replaceAt = function (idx, rem, s) {
    // inserts s at point idx in a string and removes original char
    return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem) + 1));
};

function randomNumFromLetter(letter) {
    // different "scripts" of text use different diacritical marks,
    // so pick appropriate range based on input character
    var randomDiacritic = 0;
    if (/[\u0400-\u04ff]/.test(letter)) {
        // cyrillic
        randomDiacritic = randomFromInterval(1155, 1161);
    } else if (/[\u0531-\u058f]/.test(letter)) {
        // armenian - only has one modifier char
        randomDiacritic = 1369;
    } else if (/[\u0591-\u05f4]/.test(letter)) {
        // hebrew (right to left!!) - 1425-1469, also 1471, 1473-1474, 1476-1477, 1479
        randomDiacritic = randomFromInterval(1419, 1469);
        if (randomDiacritic == 1424) {
            randomDiacritic = 1479;
        } else if (randomDiacritic >= 1422 && randomDiacritic <= 1423) {
            randomDiacritic = randomDiacritic + 54;
        } else if (randomDiacritic >= 1420 && randomDiacritic <= 1421) {
            randomDiacritic = randomDiacritic + 53;
        } else if (randomDiacritic == 1419) {
            randomDiacritic = 1471;
        }
    } else if (/[\u0600-\u06ff]/.test(letter)) {
        // arabic (right to left!!) - 1611-1630, also 1552-1557
        randomDiacritic = randomFromInterval(1605, 1630);
        if (randomDiacritic >= 1605 && randomDiacritic <= 1610) {
            randomDiacritic = randomDiacritic - 53;
        }
    } else if (/[\u0700-\u074f]/.test(letter)) {
        // syriaic (right to left!!)
        randomDiacritic = randomFromInterval(1840, 1866);
    } else if (/[\u0780-\u07b1]/.test(letter)) {
        // thaana (right to left!!)
        randomDiacritic = randomFromInterval(1958, 1968);
    } else if (/[\u07c0-\u07f1]/.test(letter)) {
        // nko (right to left!!) - requires code2000 or similar font
        randomDiacritic = randomFromInterval(2027, 2035);
    } else if (/[\u0800-\u083e]/.test(letter)) {
        // samaritan (right to left!!) - not displayable with web fonts
        randomDiacritic = randomFromInterval(2075, 2093);
    } else if (/[\u0840-\u085e]/.test(letter)) {
        // mandaic (right to left!!) - not displayable with web fonts
        randomDiacritic = randomFromInterval(2137, 2139);
    } else if (/[\u08a0-\u08fe]/.test(letter)) {
        // arabic extended a (right to left!!) - not displayable with web fonts
        randomDiacritic = randomFromInterval(2276, 2302);
    } else if (/[\u0900-\u097f]/.test(letter)) {
        // devanagari
        randomDiacritic = randomFromInterval(2364, 2388);
    } else if (/[\u0981-\u09fb]/.test(letter)) {
        // bengali -- 2492-2531, also 2433-2435
        randomDiacritic = randomFromInterval(2489, 2531);
        if (randomDiacritic >= 2689 && randomDiacritic <= 2691) {
            randomDiacritic = randomDiacritic - 56;
        }
    } else if (/[\u0a01-\u0a75]/.test(letter)) {
        // gurmukhi -- 2620-2641, also 2561-2562, 2672-2673
        randomDiacritic = randomFromInterval(2616, 2641);
        if (randomDiacritic >= 2616 && randomDiacritic <= 2617) {
            randomDiacritic = randomDiacritic - 55;
        } else if (randomDiacritic >= 2618 && randomDiacritic <= 2619) {
            randomDiacritic = randomDiacritic + 54;
        }
    } else if (/[\u0a81-\u0af1]/.test(letter)) {
        // gujarati -- 2748-2765, also 2689-2690, 2786-2787
        randomDiacritic = randomFromInterval(2744, 2765);
        if (randomDiacritic >= 2744 && randomDiacritic <= 2745) {
            randomDiacritic = randomDiacritic - 55;
        } else if (randomDiacritic >= 2746 && randomDiacritic <= 2747) {
            randomDiacritic = randomDiacritic + 40;
        }
    } else if (/[\u0b01-\u0b77]/.test(letter)) {
        // oriya -- 2878-2903, also 2876, 2914-2915
        randomDiacritic = randomFromInterval(2875, 2903);
        if (randomDiacritic == 2875) {
            randomDiacritic = 2914;
        } else if (randomDiacritic == 2877) {
            randomDiacritic = 2915;
        }
    } else if (/[\u0b82-\u0bfa]/.test(letter)) {
        // tamil -- 2946-2647, also 3008, 3021, plus spacing combining chars @ 3006-3031
        randomDiacritic = randomFromInterval(2944, 2947);
        if (randomDiacritic == 2944) {
            randomDiacritic = 3008;
        } else if (randomDiacritic == 2945) {
            randomDiacritic = 3021;
        }
    } else if (/[\u0c01-\u0c7f]/.test(letter)) {
        // telugu -- plus spacing combining chars @ 3073-3075
        randomDiacritic = randomFromInterval(3134, 3158);
    } else if (/[\u0c82-\u0cf2]/.test(letter)) {
        // kannada -- 3362-3286, also 3260, 3298-3299, plus spacing combining chars @ 3202-3203
        randomDiacritic = randomFromInterval(3259, 3286);
        if (randomDiacritic >= 3260 && randomDiacritic <= 3261) {
            randomDiacritic = randomDiacritic + 38;
        } else if (randomDiacritic == 3259) {
            randomDiacritic = 3260;
        }
    } else if (/[\u0d02-\u0d7f]/.test(letter)) {
        // malayalam -- also 3405, 3426-3427, plus spacing combining chars @ 3330-3331, 3391-3392, 3398-3904
        randomDiacritic = randomFromInterval(3390, 3396);
        if (randomDiacritic == 3390) {
            randomDiacritic = 3405;
        } else if (randomDiacritic >= 3391 && randomDiacritic <= 3392) {
            randomDiacritic = randomDiacritic + 35;
        }
    } else if (/[\u0d82-\u0df4]/.test(letter)) {
        // sinhala -- plus spacing combining chars @ 3458-3459, 3544-3571
        randomDiacritic = randomFromInterval(3530, 3571);
        if (randomDiacritic >= 3543 && randomDiacritic <= 3544) {
            randomDiacritic = randomDiacritic - 85;
        }
    } else if (/[\u0e01-\u0e5b]/.test(letter)) {
        // thai 3655-3662, also 3633, 3636-3642
        randomDiacritic = randomFromInterval(3648, 3662);
        if (randomDiacritic == 3654) {
            randomDiacritic = 3633;
        } else if (randomDiacritic >= 3648 && randomDiacritic <= 3653) {
            randomDiacritic = randomDiacritic - 12;
        }
    } else if (/[\u0e81-\u0edf]/.test(letter)) {
        // lao
        randomDiacritic = randomFromInterval(3761, 3772);
    } else if (/[\u0f00-\u0ffd]/.test(letter)) {
        // tibetan - 3984-4028, also 3864-3865, 3893, 3897, 3953-3975  plus spacing combining 3902-3903
        randomDiacritic = randomFromInterval(3957, 4028);
        if (randomDiacritic >= 3961 && randomDiacritic <= 3983) {
            randomDiacritic = randomDiacritic - 8;
        } else if (randomDiacritic == 3660) {
            randomDiacritic = 3897;
        } else if (randomDiacritic == 3659) {
            randomDiacritic = 3893;
        } else if (randomDiacritic >= 3957 && randomDiacritic <= 3958) {
            randomDiacritic = randomDiacritic + 93;
        }
    } else if (/[\u1200-\u137c]/.test(letter)) {
        // ethiopic
        randomDiacritic = randomFromInterval(4957, 4959);
    } else if (/[\u1780-\u17f9]/.test(letter)) {
        // khmer
        randomDiacritic = randomFromInterval(6068, 6099);
    } else if (/[\u3040-\u309f]/.test(letter)) {
        // hiragana
        randomDiacritic = randomFromInterval(12441, 12442);
    } else if (/[\u30a0-\u30ff]/.test(letter)) {
        // katakana
        randomDiacritic = randomFromInterval(12441, 12442);
    } else if (/[\u3200-\u4db5]/.test(letter)) {
        // CJK
        randomDiacritic = randomFromInterval(12330, 12333);
    } else {
        // cobining diacritical marks block, plus a few from supplement
        randomDiacritic = randomFromInterval(768, 890);
        // reroute nums above 880 to supplemental block
        if (randomDiacritic >= 880 && randomDiacritic <= 890) {
            randomDiacritic = randomDiacritic + 6736;
        // 832-833 (U+0340-U+0341) don't always play well with facebook,
        // so reroute those to supplemental
        } else if (randomDiacritic >= 832 && randomDiacritic <= 833) {
            randomDiacritic = randomDiacritic + 6846;
        }
    }
    
    return randomDiacritic;
};



function glitchText(id1, id2, isInput, copyBack) {
    // picks a random char in input text, and adds a random diacritic
    
    var inputText = document.getElementById(id1);
    
    // if no value given for id2 then use id1 for both input and output
    if (id2 == null) {
        var outputText = document.getElementById(id1);
    } else {
        var outputText = document.getElementById(id2);
    }
    
    // isInput must be true if the text to glitch is coming from an input element (text box, etc)
    // if not, assume text is coming from a standard HTML element
    if (isInput == true) {
        var textLength = inputText.value.length;
    } else {
        var textLength = inputText.innerHTML.length;
    }
    
    // pick a random char in input string
    var i = randomFromInterval(1, textLength);
    
    var letter = outputText.innerHTML.charAt(i - 1);
    
    // call randomNumFromLetter() script to pick random diacritic of appropriate type
    var randomDiacritic = randomNumFromLetter(letter);
    
    outputText.innerHTML = outputText.innerHTML.splice(i, 0, '&#' + randomDiacritic + ';');
    
    // copy glitched text back into input, if desired
    if (copyBack == true) {
        if (isInput == true) {
            inputText.value = outputText.innerHTML;
        } else {
            inputText.innerHTML = outputText.innerHTML;
        }
    }
};

function glitchAll(id1, id2, isInput, copyBack, skipSpace) {
    // adds a random diacritic after every char in input string
    // note that diacritics you already added count as chars, so these add up fast!
    
    var inputText = document.getElementById(id1);
    
    if (id2 == null) {
        var outputText = document.getElementById(id1);
    } else {
        var outputText = document.getElementById(id2);
    }
    
    if (isInput == true) {
        var textLength = inputText.value.length;
    } else {
        var textLength = inputText.innerHTML.length;
    }
    
    // declare these here so we don't re-declare every time loop runs
    var randomDiacritic = 768;
    var glitching = outputText.innerHTML;
    var letter = 'b';
    
    // for next loop - cycle through all chars and add random diacritic after each
    for (var i = textLength; i >= 1; i -= 1) {
        letter = glitching.charAt(i - 1);
        
        if (skipSpace == true) {
            if (letter == " ") {
                
            } else {
                randomDiacritic = randomNumFromLetter(letter);
                glitching = glitching.splice(i, 0, '&#' + randomDiacritic + ';');
            }
        }
        
        else {
        
            randomDiacritic = randomNumFromLetter(letter);
            glitching = glitching.splice(i, 0, '&#' + randomDiacritic + ';');
        }
        
        
        outputText.innerHTML = glitching;
        
        // copy glitched text back into input box, if desired
        if (copyBack == true) {
            if (isInput == true) {
                inputText.value = outputText.innerHTML;
            } else {
                inputText.innerHTML = outputText.innerHTML;
            }
        }
    }
};


function glitchAllSame(id1, id2, isInput, copyBack, skipSpace) {
    // this is the same as glitchAll except it adds the same diacritic after each char
    var inputText = document.getElementById(id1);
    
    if (id2 == null) {
        var outputText = document.getElementById(id1);
    } else {
        var outputText = document.getElementById(id2);
    }
    
    if (isInput == true) {
        var textLength = inputText.value.length;
    } else {
        var textLength = inputText.innerHTML.length;
    }
    
    // this time we pick a diacritic before looping through text
    var glitching = outputText.innerHTML;
    // pick diacritic based on char at index 0
    var letter = glitching.charAt(0);
    
    var randomDiacritic = randomNumFromLetter(letter);
    
    // for next loop
    for (var i = textLength; i >= 1; i -= 1) {
        
        letter = glitching.charAt(i - 1);
        if (skipSpace == true) {
            if (letter == " ") {
                
            } else {
                glitching = glitching.splice(i, 0, '&#' + randomDiacritic + ';');
            }
        }
        
        else {
        
            glitching = glitching.splice(i, 0, '&#' + randomDiacritic + ';');
        }
        outputText.innerHTML = glitching;
        
        // copy glitched text back into input box, if desired
        if (copyBack == true) {
            if (isInput == true) {
                inputText.value = outputText.innerHTML;
            } else {
                inputText.innerHTML = outputText.innerHTML;
            }
        }
    }
};

function glitchTextPrecise(id1, id2, isInput, copyBack, diacritic, isInput2) {
    // picks a random char in input text, and the diacritic provided
    // arg 'diacritic' is required and can the a number or the ID of an input that provides a number
    
    var inputText = document.getElementById(id1);
    
    // if no value given for id2 then use id1 for both input and output
    if (id2 == null) {
        var outputText = document.getElementById(id1);
    } else {
        var outputText = document.getElementById(id2);
    }
    
    // isInput must be true if the text to glitch is coming from an input element (text box, etc)
    // if not, assume text is coming from a standard HTML element
    if (isInput == true) {
        var textLength = inputText.value.length;
    } else {
        var textLength = inputText.innerHTML.length;
    }
    
    // pick a random char in input string
    var i = randomFromInterval(1, textLength);
    
    // if using an input or select to choose the diacritic, supply its ID as 'diacritic' and set isInput2 to true
    // otherwise, assume 'diacritic' is a number
    if (isInput2 == true) {
        var charNum = document.getElementById(diacritic).value;
    } else {
        var charNum = diacritic;
    }
    
    outputText.innerHTML = outputText.innerHTML.splice(i, 0, '&#' + charNum + ';');
    
    // copy glitched text back into input, if desired
    if (copyBack == true) {
        if (isInput == true) {
            inputText.value = outputText.innerHTML;
        } else {
            inputText.innerHTML = outputText.innerHTML;
        }
    }
};

function glitchAllPrecise(id1, id2, isInput, copyBack, diacritic, isInput2, skipSpace) {
    // this is the same as glitchAllSame except the diacritic is supplied as input
    var inputText = document.getElementById(id1);
    
    if (id2 == null) {
        var outputText = document.getElementById(id1);
    } else {
        var outputText = document.getElementById(id2);
    }
    
    if (isInput == true) {
        var textLength = inputText.value.length;
    } else {
        var textLength = inputText.innerHTML.length;
    }
    
    var glitching = outputText.innerHTML;
    
    // if using an input or select to choose the diacritic, supply its ID as 'diacritic' and set isInput to true
    // otherwise, assume 'diacritic' is a number
    if (isInput2 == true) {
        var charNum = document.getElementById(diacritic).value;
    } else {
        var charNum = diacritic;
    }
    
    // for next loop
    for (var i = textLength; i >= 1; i -= 1) {
        
                var letter = glitching.charAt(i - 1);
        if (skipSpace == true) {
            if (letter == " ") {
                
            } else {
                glitching = glitching.splice(i, 0, '&#' + charNum + ';');
            }
        }
        
        else {
        
            glitching = glitching.splice(i, 0, '&#' + charNum + ';');
        }
        outputText.innerHTML = glitching;
        
        // copy glitched text back into input box, if desired
        if (copyBack == true) {
            if (isInput == true) {
                inputText.value = outputText.innerHTML;
            } else {
                inputText.innerHTML = outputText.innerHTML;
            }
        }
    }
};


function randomizeText(id1, id2, isInput, copyBack, skipSpace) {
    // effectively replaces every char in input string with a random char
    
    var inputText = document.getElementById(id1);
    
    if (id2 == null) {
        var outputText = document.getElementById(id1);
    } else {
        var outputText = document.getElementById(id2);
    }
    
    if (isInput == true) {
        var textLength = inputText.value.length;
    } else {
        var textLength = inputText.innerHTML.length;
    }
    
    var randomChar = 63;
    var glitching = outputText.innerHTML;
    var charToAdd;
    
    // for next loop - stop after each character, add a new random character, then delete original character
    for (var i = textLength - 1; i >= 0; i -= 1) {
        
        letter = glitching.charAt(i);
        
        // stop at 10175 to avoid too many undisplayable chars (empty squares) but you could go much higher
        randomChar = randomFromInterval(33, 10175);
        
        // ampersand and angle brackets don't play well, so avoid them too
        if (randomChar == 38) {
            randomChar = randomFromInterval(63, 1969);
        } else if (randomChar == 60) {
            randomChar = randomFromInterval(63, 1969);
        } else if (randomChar == 62) {
            randomChar = randomFromInterval(63, 1969);
        }
        
        if (skipSpace == true) {
            if (letter == ' ') {
                charToAdd = ' ';
            } else {
                charToAdd = '&#' + randomChar + ';';
            }
        }
        
        else {charToAdd = '&#' + randomChar + ';'}
        
        glitching = glitching.replaceAt(i, 0, charToAdd);
        outputText.innerHTML = glitching;
        
        if (copyBack == true) {
            if (isInput == true) {
                inputText.value = outputText.innerHTML;
            } else {
                inputText.innerHTML = outputText.innerHTML;
            }
        }
    }
};


function randomizeInRange(id1, id2, isInput, copyBack, startRange, endRange, skipSpace) {
    // same as randomizeText() except you specify the range of characters
    
    var inputText = document.getElementById(id1);
    
    if (id2 == null) {
        var outputText = document.getElementById(id1);
    } else {
        var outputText = document.getElementById(id2);
    }
    
    if (isInput == true) {
        var textLength = inputText.value.length;
    } else {
        var textLength = inputText.innerHTML.length;
    }
    
    var randomChar = 63;
    var glitching = outputText.innerHTML;
    var charToAdd;
    
    // for next loop - stop after each character, add a new random character, then delete original character
    for (var i = textLength - 1; i >= 0; i -= 1) {
        var letter = glitching.charAt(i);
        
        randomChar = randomFromInterval(startRange, endRange);
        
        // ampersand and angle brackets don't play well, so avoid them too
        if (randomChar == 38) {
            randomChar = randomFromInterval(63, 1969);
        } else if (randomChar == 60) {
            randomChar = randomFromInterval(63, 1969);
        } else if (randomChar == 62) {
            randomChar = randomFromInterval(63, 1969);
        }
        
        // if you don't want to filter out these blocks, comment out/delete this section 
        else if (randomChar >= 2043 && randomChar <= 2304) {
            // these blocks undisplayable with common web fonts, so avoid
            randomChar = randomFromInterval(7424, 10175);
        } else if (randomChar >= 6688 && randomChar <= 7247) {
            randomChar = randomFromInterval(7424, 10175);
        }
        
        if (skipSpace == true) {
            if (letter == ' ') {
                charToAdd = ' ';
            } else {
                charToAdd = '&#' + randomChar + ';'
            }
        }
        
        else {charToAdd = '&#' + randomChar + ';'}
        
        glitching = glitching.replaceAt(i, 0, charToAdd);
        outputText.innerHTML = glitching;
        
        if (copyBack == true) {
            if (isInput == true) {
                inputText.value = outputText.innerHTML;
            } else {
                inputText.innerHTML = outputText.innerHTML;
            }
        }
    }
};

function randomizeBlock(id1, id2, isInput, copyBack, blockName, skipSpace) {
    // given a block name, pick the correct range for generating random characters
    // id1, id2, isInput, copyBack all function the same as earlier scripts
    if (document.getElementById(blockName).value == "Latin") {
        var startRange = 33;
        var endRange = 879;
    } else if (document.getElementById(blockName).value == "Basic ASCII") {
        var startRange = 33;
        var endRange = 127;
    } else if (document.getElementById(blockName).value == "Extended ASCII") {
        var startRange = 33;
        var endRange = 255;
    } else if (document.getElementById(blockName).value == "Greek") {
        var startRange = 880;
        var endRange = 1023;
    } else if (document.getElementById(blockName).value == "Cyrillic") {
        var startRange = 1024;
        var endRange = 1309;
    } else if (document.getElementById(blockName).value == "Armenian") {
        var startRange = 1329;
        var endRange = 1419;
    } else if (document.getElementById(blockName).value == "Hebrew") {
        var startRange = 1425;
        var endRange = 1524;
    } else if (document.getElementById(blockName).value == "Arabic") {
        var startRange = 1536;
        var endRange = 1791;
    } else if (document.getElementById(blockName).value == "Syriac") {
        var startRange = 1792;
        var endRange = 1871;
    } else if (document.getElementById(blockName).value == "Thaana") {
        var startRange = 1902;
        var endRange = 1969;
    } else if (document.getElementById(blockName).value == "NKo") {
        var startRange = 1984;
        var endRange = 2042;
    } else if (document.getElementById(blockName).value == "Devanagari") {
        var startRange = 2304;
        var endRange = 2431;
    } else if (document.getElementById(blockName).value == "Bengali") {
        var startRange = 2433;
        var endRange = 2554;
    } else if (document.getElementById(blockName).value == "Gurmukhi") {
        var startRange = 2561;
        var endRange = 2677;
    } else if (document.getElementById(blockName).value == "Gujarati") {
        var startRange = 2689;
        var endRange = 2801;
    } else if (document.getElementById(blockName).value == "Oriya") {
        var startRange = 2817;
        var endRange = 2935;
    } else if (document.getElementById(blockName).value == "Tamil") {
        var startRange = 2946;
        var endRange = 3066;
    } else if (document.getElementById(blockName).value == "Telugu") {
        var startRange = 3073;
        var endRange = 3199;
    } else if (document.getElementById(blockName).value == "Kannada") {
        var startRange = 3202;
        var endRange = 3314;
    } else if (document.getElementById(blockName).value == "Malayalam") {
        var startRange = 3330;
        var endRange = 3455;
    } else if (document.getElementById(blockName).value == "Sinhala") {
        var startRange = 3458;
        var endRange = 3572;
    } else if (document.getElementById(blockName).value == "Thai") {
        var startRange = 3585;
        var endRange = 3675;
    } else if (document.getElementById(blockName).value == "Lao") {
        var startRange = 3703;
        var endRange = 3807;
    } else if (document.getElementById(blockName).value == "Tibetan") {
        var startRange = 3840;
        var endRange = 4058;
    } else if (document.getElementById(blockName).value == "Myanmar") {
        var startRange = 4096;
        var endRange = 4255;        
    } else if (document.getElementById(blockName).value == "Georgian") {
        var startRange = 4256;
        var endRange = 4351;        
    } else if (document.getElementById(blockName).value == "Hangul") {
        var startRange = 4352;
        var endRange = 4607;
    } else if (document.getElementById(blockName).value == "Ethiopic") {
        var startRange = 4608;
        var endRange = 4988;
    } else if (document.getElementById(blockName).value == "Cherokee") {
        var startRange = 5024;
        var endRange = 5108;
    } else if (document.getElementById(blockName).value == "Canadian Aboriginal") {
        var startRange = 5120;
        var endRange = 5759;
    } else if (document.getElementById(blockName).value == "Ogham") {
        var startRange = 5760;
        var endRange = 5788;
    } else if (document.getElementById(blockName).value == "Runic") {
        var startRange = 5792;
        var endRange = 5872;
    } else if (document.getElementById(blockName).value == "Hanunoo") {
        var startRange = 5920;
        var endRange = 5942;
    } else if (document.getElementById(blockName).value == "Buhid") {
        var startRange = 5952;
        var endRange = 5971;
    } else if (document.getElementById(blockName).value == "Khmer") {
        var startRange = 6016;
        var endRange = 6137;
    } else if (document.getElementById(blockName).value == "Mongolian") {
        var startRange = 6144;
        var endRange = 6314;
    } else if (document.getElementById(blockName).value == "Limbu") {
        var startRange = 6400;
        var endRange = 6479;
    } else if (document.getElementById(blockName).value == "Tai Le") {
        var startRange = 6480;
        var endRange = 6516;
    } else if (document.getElementById(blockName).value == "Buginese") {
        var startRange = 6656;
        var endRange = 6683;
    } else if (document.getElementById(blockName).value == "Ol Chiki") {
        var startRange = 7248;
        var endRange = 7295;
    } else if (document.getElementById(blockName).value == "Punctuation") {
        var startRange = 8192;
        var endRange = 8303;
    } else if (document.getElementById(blockName).value == "Superscripts") {
        var startRange = 8304;
        var endRange = 8348;
    } else if (document.getElementById(blockName).value == "Currency") {
        var startRange = 8352;
        var endRange = 8378;
    } else if (document.getElementById(blockName).value == "Hiragana") {
        var startRange = 12353;
        var endRange = 12447;
    } else if (document.getElementById(blockName).value == "Katakana") {
        var startRange = 12448;
        var endRange = 12543;
    } else if (document.getElementById(blockName).value == "Bopomofo") {
        var startRange = 12549;
        var endRange = 12589;
    } else if (document.getElementById(blockName).value == "CJK") {
        var startRange = 12800;
        var endRange = 19893;
    } else if (document.getElementById(blockName).value == "Broad") {
        var startRange = 33;
        var endRange = 10175;
    } else if (document.getElementById(blockName).value == "Shapes") {
        var startRange = 9472;
        var endRange = 9727;
    } else if (document.getElementById(blockName).value == "Blocks") {
        var startRange = 9600;
        var endRange = 9631;
    } else if (document.getElementById(blockName).value == "Shades") {
        var startRange = 9617;
        var endRange = 9619;
    } else if (document.getElementById(blockName).value == "Geometric") {
        var startRange = 9632;
        var endRange = 9727;
    } else if (document.getElementById(blockName).value == "Symbols") {
        var startRange = 9728;
        var endRange = 9839;
    } else if (document.getElementById(blockName).value == "More Symbols") {
        var startRange = 9840;
        var endRange = 9983;
    } else if (document.getElementById(blockName).value == "Dingbats") {
        var startRange = 9985;
        var endRange = 10175;
    } else if (document.getElementById(blockName).value == "Braille") {
        var startRange = 10240;
        var endRange = 10495;
    } else if (document.getElementById(blockName).value == "Glagolithic") {
        var startRange = 11264;
        var endRange = 11358;
    } else if (document.getElementById(blockName).value == "Coptic") {
        var startRange = 11392;
        var endRange = 11498;
    } else if (document.getElementById(blockName).value == "Tifinagh") {
        var startRange = 11568;
        var endRange = 11621;
    } else if (document.getElementById(blockName).value == "Supplemental Punctuation") {
        var startRange = 11776;
        var endRange = 11835;
    } else if (document.getElementById(blockName).value == "Vai") {
        var startRange = 42240;
        var endRange = 42539;
    } else if (document.getElementById(blockName).value == "Saurashtra") {
        var startRange = 43136;
        var endRange = 43203;
    } else if (document.getElementById(blockName).value == "Kayah Li") {
        var startRange = 43264;
        var endRange = 43311;
    } else if (document.getElementById(blockName).value == "Rejang") {
        var startRange = 43312;
        var endRange = 43347;
    } else if (document.getElementById(blockName).value == "Cham") {
        var startRange = 43520;
        var endRange = 43574;
    } else if (document.getElementById(blockName).value == "Linear B") {
        var startRange = 65536;
        var endRange = 65786;
    } else if (document.getElementById(blockName).value == "Cypriot") {
        var startRange = 67584;
        var endRange = 65647;
    } else if (document.getElementById(blockName).value == "Phaistos Disc") {
        var startRange = 66000;
        var endRange = 66045;
    } else if (document.getElementById(blockName).value == "Arrows") {
        var startRange = 8592;
        var endRange = 8682;
    } else if (document.getElementById(blockName).value == "Letterlike") {
        var startRange = 8448;
        var endRange = 8527;
    } else if (document.getElementById(blockName).value == "Numbers") {
        var startRange = 8528;
        var endRange = 8585;
    } else if (document.getElementById(blockName).value == "Technical") {
        var startRange = 8704;
        var endRange = 9203;
    } else if (document.getElementById(blockName).value == "Enclosed") {
        var startRange = 9312;
        var endRange = 9471;
    } else if (document.getElementById(blockName).value == "IPA") {
        var startRange = 592;
        var endRange = 687;
    } else if (document.getElementById(blockName).value == "Phonetics") {
        var startRange = 7424;
        var endRange = 7615;
    } else if (document.getElementById(blockName).value == "Mishmash") {
        var startRange = 7124;
        var endRange = 10175;
    } else if (document.getElementById(blockName).value == "Pictographs") {
        var startRange = 127744;
        var endRange = 128591;
    } else if (document.getElementById(blockName).value == "Transport") {
        var startRange = 128640;
        var endRange = 128709;
    } else if (document.getElementById(blockName).value == "Alchemical") {
        var startRange = 128768;
        var endRange = 128883;
    } else if (document.getElementById(blockName).value == "Music") {
        var startRange = 119040;
        var endRange = 119261;
    }
    // call randomizeInRange() to generate the random character and output back to screen
    randomizeInRange(id1, id2, isInput, copyBack, startRange, endRange, skipSpace);
};

function randomFromInterval(from, to) {
    // generate a "random" number between from and to
    return Math.floor(Math.random() *(to - from + 1) + from);
};