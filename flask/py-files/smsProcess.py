import spacy
from spacy import displacy


import re


def find_money(str):
    regex = re.compile(
        "((BDT|TK|Tk|Taka|taka)(\s*)?(([1-9]{1}([0-9]|(\\,)?)*((\\.)[0-9]{2})?)|(([0]{1}((\\.)([0-9]){2})))))|((([1-9]{1}([0-9]|(\\,)?)*((\\.)[0-9]{2})?)|(([0]{1}((\\.)([0-9]){2}))))(\s*)?(Tk\.|Taka|taka))")
    res = re.search(regex, str)
    if(res):
        return res.group(0)
    else:
        return ""


def find_date(str):

    reg_date_1 = re.compile(
        "([0-9]{2}(\/|\.|\-)[0-9]{2}(\/|\.|\-)[0-9]{2,4})|([0-9]{2,4}(\/|\.|\-)[0-9]{2}(\/|\.|\-)[0-9]{2})")
    reg_time = re.compile(
        "(([0-1]?[0-9]|2[0-3]):[0-5][0-9](\s*)?(pm|am|PM|AM)?)")
    reg_date_2 = re.compile(
        "((([0-9])|([0-2][0-9])|([3][0-1]))(\-|\s)(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(\-|\s)?(\d{2,4})?)|((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(\-|\s)([0-9]{1,2})(\-|\s|\,)?(\d{2,4})?)")
    ret = ''
    res = re.search(reg_date_1, str)
    res_2 = re.search(reg_date_2, str)
    if(res):
        ret += res.group(0)+' '
        time = re.search(reg_time, str)
        if bool(time):
            ret += time.group(0)

    elif(res_2):
        ret += res_2.group(0)+' '
        time = re.search(reg_time, str)
        if bool(time):
            ret += time.group(0)

    # print(ret)
    return ret


def getEndSubString(regex, str):
    res = re.search(regex, str, re.IGNORECASE)
    str = str[res.end():]
    # print(str)
    return str


def getFrontSubString(regex, str):
    res = re.search(regex, str, re.IGNORECASE)
    str = str[:res.start()]
    # print(str)
    return str


def getInfo(sms):
    NER = spacy.load("en_core_web_sm")

    str = "You have received a deposit of BDT 600"
    text = NER("Dear Card Member,your monthly bill against card no 452989*2604 is $1377.70 dr. for Aug 21. Min due: $500.00. Last Pmt date Sep-2-2021. Call: 01777797777")
    text1 = NER("Bill Payment to DPDC is successful.Amount: BDT 2322.00. Biller Account: 19254909. Fee:0.00 TxnId: 711O3YRZ 11/01/2022 13:36")
    text2 = NER("Cash In Tk 15,000.00 from 01756713306 successful. Fee Tk 0.00. Balance Tk 17,518.41. TrxID 8LC09J9O6I at 12/12/2021 14:49. Download App: https://bKa.sh/8ap")
    text3 = NER("Dear Card Member,your monthly bill against card no 452989*2604 is BDT 560.00 dr. for Sep 21. Min due: $500.00. Last Pmt date Oct-4-2021. Call: 16735")
    text4 = NER("BDT 300 has been credited to your account")
    text5 = NER("Dear Card Member, You have Purchase BDT 1,032.00 from daraz.com.bd 16492, using MGBL Card 452989*2604 on 14/07/2021 05:43 pm. Balance BDT 4,99,367.37. Call:01777797")
    text6 = NER("We have received your payment")
    text7 = NER("You have received a deposit of BDT 600")
    text8 = NER("Payment of BDT 13.20 is made at Infinity Malls ")
    text9 = NER(
        "Dear Card Member, BDT 636.00 has been credited to your MGBL Credit Card 452989*2604 on 27.07.21. Thank you")
    text10 = NER("Dear Sir, your A/C ***7591 debited (Nexus Debit Card Renewal Fee) by Tk460.00 on 08-03-2022 10:54:28 PM C/B Tk19,358.47. NexusPay")

    str = sms
    textTemp = NER(str)
    # for word in text3.ents:
    #     print(word.text,word.label_)

    nlp = spacy.load('en_core_web_sm')
    displacy.render(textTemp, jupyter=True)
    # for token in text2:
    #      #print (token.text, token.tag_ , token.head, token.dep_)

    #      if(token.dep_ == 'ROOT'):
    #         print(token.text)

    dict = {"Date": "undefined", "Balance": "undefined",
            "Amount": "undefined", "Type": "undefined"}
    dict["Date"] = find_date(str)
    print(str+"\n\n")

    if 'c/b' in str.lower():
        temp = getEndSubString("c/b", str)
        dict["Balance"] = find_money(temp)
        str = str.replace(dict["Balance"], "")

    for token in textTemp:
        #    print(token.text)

        if 'payment' in token.text.lower():

            temp = getEndSubString("payment", str)
            dict["Amount"] = find_money(temp)
            str = str.replace(dict["Amount"], "")
            dict["Type"] = "Expense"

        if 'bill' in token.text.lower():

            temp = getEndSubString("bill", str)
            dict["Amount"] = find_money(temp)
            str = str.replace(dict["Amount"], "")
            dict["Type"] = "Expense"

        if 'balance' in token.text.lower():

            temp = getEndSubString("balance", str)
            # print(str)
            dict["Balance"] = find_money(temp)
            str = str.replace(dict["Balance"], "")

        if 'purchase' in token.text.lower():

            temp = getEndSubString("purchase", str)
            dict["Amount"] = find_money(temp)
            str = str.replace(dict["Amount"], "")
            dict["Type"] = "Expense"

        if 'purchased' in token.text.lower():
            # print(token.text)

            temp = getEndSubString("purchased", str)
            dict["Amount"] = find_money(temp)
            str = str.replace(dict["Amount"], "")
            dict["Type"] = "Expense"

        if 'paid' in token.text.lower():

            temp = getEndSubString("paid", str)
            dict["Amount"] = find_money(temp)
            str = str.replace(dict["Amount"], "")
            dict["Type"] = "Expense"

        if 'received' in token.text.lower():
            temp = getEndSubString("received", str)
            dict["Amount"] = find_money(temp)
            str = str.replace(dict["Amount"], "")

            for child in token.children:
                if child.pos_ == 'PRON' and child.text.lower() == 'you':
                    dict["Type"] = "Income"

                if child.pos_ == 'PRON' and child.text.lower() == 'we':
                    dict["Type"] = "Expense"

        if 'got' in token.text.lower():
            temp = getEndSubString("got", str)
            dict["Amount"] = find_money(temp)
            str = str.replace(dict["Amount"], "")

            for child in token.children:
                if child.pos_ == 'PRON' and child.text.lower() == 'you':
                    dict["Type"] = "Income"

                if child.pos_ == 'PRON' and child.text.lower() == 'we':
                    dict["Type"] = "Expense"

        if 'credited' in token.text.lower():

            # print("children")
            for child in token.children:
                #print(child.dep_+" "+child.text)
                if child.pos_ == 'ADP' and (child.text.lower() == 'by' or child.text.lower() == 'with'):

                    dict["Type"] = "Credit"
                    temp = getEndSubString("credited", str)
                    dict["Amount"] = find_money(temp)
                    str = str.replace(dict["Amount"], "")

                if child.pos_ == 'ADP' and child.text.lower() == 'to':
                    dict["Type"] = "Credit"
                    temp = getFrontSubString("credited", str)
                    dict["Amount"] = find_money(temp)
                    str = str.replace(dict["Amount"], "")

        if 'cash' in token.text.lower():

            for child in token.children:
                #print(child.dep_+" "+child.text)
                if child.pos_ == 'ADP' and child.text.lower() == 'in':
                    dict["Type"] = "Income"
                    temp = getEndSubString("cash", str)
                    dict["Amount"] = find_money(temp)
                    str = str.replace(dict["Amount"], "")

                if child.pos_ == 'ADP' and child.text.lower() == 'out':
                    dict["Type"] = "Expense"
                    temp = getFrontSubString("cash", str)
                    dict["Amount"] = find_money(temp)
                    str = str.replace(dict["Amount"], "")

        if 'debited' in token.text.lower():

            print("children")
            for child in token.children:
                print(child.dep_+" "+child.text)
                if child.pos_ == 'ADP' and (child.text.lower() == 'by' or child.text.lower() == 'with'):

                    dict["Type"] = "Debit"
                    temp = getEndSubString("debited", str)
                    dict["Amount"] = find_money(temp)
                    str = str.replace(dict["Amount"], "")

                if child.pos_ == 'ADP' and child.text.lower() == 'to':
                    dict["Type"] = "Debit"
                    temp = getFrontSubString("debited", str)
                    dict["Amount"] = find_money(temp)
                    str = str.replace(dict["Amount"], "")
    return dict


print(getInfo("Dear Sir, your A/C ***7591 debited (Account Maintenance Fee Incl. VAT) by Tk115.00 on 25-12-2020 12:46:27 AM C/B Tk15,161.50. NexusPay https://bit.ly/nexuspay"))
