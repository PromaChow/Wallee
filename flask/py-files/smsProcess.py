from gensim.parsing.preprocessing import remove_stopwords
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
        "([0-9]{2}(\s*)?(\/|\.|\-)(\s*)?[0-9]{2}(\s*)?(\/|\.|\-)(\s*)?[0-9]{2,4})(\s*)?|([0-9]{2,4}(\s*)?(\/|\.|\-)(\s*)?[0-9]{2}(\s*)?(\/|\.|\-)(\s*)?[0-9]{2}(\s*)?)", re.IGNORECASE)
    reg_time = re.compile(
        "(\s*)?(([0-1]?[0-9]|2[0-3])(\s*)?:[0-5][0-9](\s*)?(:[0-5][0-9](\s*))?(p(\s*|\.)?m(\s*|\.)|a(\s*|\.)?m(\s*|\.)|P(\s*|\.)?M(\s*|\.)|A(\s*|\.)?M(\s*|\.))?)", re.IGNORECASE)
    reg_date_2 = re.compile(
        "(((\s*)?([0-9])(\s*)?|(\s*)?([0-2][0-9])(\s*)?|(\s*)?([3][0-1])(\s*)?)(\s*)?(\-|\s)(\s*)?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(\s*)?(\-|\s)?(\s*)?(\d{2,4})?(\s*)?)(\s*)?|((\s*)?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(\s*)?(\s*)?(\-|\s)(\s*)?([0-9]{1,2})(\s*)?(\-|\s|\,)?(\s*)?(\d{2,4})?)(\s*)?", re.IGNORECASE)

    reg_date_3 = re.compile(
        "((([0-9])|([0-2][0-9])|([3][0-1]))(\-|\s)(January|February|March|April|May|June|July|August|September|October|November|December)(\-|\s)?(\d{2,4})?)|((January|February|March|April|May|June|July|August|September|October|November|December)(\-|\s)([0-9]{1,2})(\-|\s|\,)?(\s)?(\d{2,4})?)", re.IGNORECASE)
    ret = ''
    res = re.search(reg_date_1, str)
    res_2 = re.search(reg_date_2, str)
    res_3 = re.search(reg_date_3, str)
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

    elif(res_3):
        ret += res_3.group(0)+' '
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


def preProcess(str):
    #str = str.replace("-", " ")
    res = re.sub("(\(.*\))", "", str)
    res = res.replace("-", " ")
    res = res.replace("(\n)*", " ")
    res = res.replace("  ", " ")

    return res


def getInfo(sms):
    NER = spacy.load("en_core_web_sm")
    str = sms

    # for word in text3.ents:
    #     print(word.text,word.label_)

    #nlp = spacy.load('en_core_web_sm')

    # for token in text2:
    #      #print (token.text, token.tag_ , token.head, token.dep_)

    #      if(token.dep_ == 'ROOT'):
    #         print(token.text)

    dict = {"Date": "undefined", "Balance": "undefined",
            "Amount": "undefined", "Type": "undefined"}
    dict["Date"] = find_date(str)
    # print(str+"\n\n")
    str.replace("-", " ")
    str = preProcess(str)
    print(str)
    textTemp = NER(str)
    displacy.render(textTemp, jupyter=True)

    if 'c/b' in str.lower():
        temp = getEndSubString("c/b", str)
        dict["Balance"] = find_money(temp)
        str = str.replace(dict["Balance"], "")

    for token in textTemp:
        #    print(token.text)

        if 'payment' in token.text.lower():

            temp = getEndSubString("payment", str)
            # print(temp)
            dict["Amount"] = find_money(temp)
            # str = str.replace(dict["Amount"], "")
            dict["Type"] = "Expense"

        if 'bill' in token.text.lower():

            temp = getEndSubString("bill", str)
            dict["Amount"] = find_money(temp)
            # str = str.replace(dict["Amount"], "")
            dict["Type"] = "Expense"

        if 'balance' in token.text.lower():

            temp = getEndSubString("balance", str)
            # print(str)
            dict["Balance"] = find_money(temp)
            # str = str.replace(dict["Balance"], "")

        if 'purchase' in token.text.lower():

            temp = getEndSubString("purchase", str)
            dict["Amount"] = find_money(temp)
            # str = str.replace(dict["Amount"], "")
            dict["Type"] = "Expense"

        if 'purchased' in token.text.lower():
            # print(token.text)

            temp = getEndSubString("purchased", str)
            dict["Amount"] = find_money(temp)
            # str = str.replace(dict["Amount"], "")
            dict["Type"] = "Expense"

        if 'paid' in token.text.lower():

            temp = getEndSubString("paid", str)
            dict["Amount"] = find_money(temp)
            # str = str.replace(dict["Amount"], "")
            dict["Type"] = "Expense"

        if 'received' in token.text.lower():
            temp = getEndSubString("received", str)
            dict["Amount"] = find_money(temp)
            # str = str.replace(dict["Amount"], "")

            for child in token.children:
                if child.pos_ == 'PRON' and child.text.lower() == 'you':
                    dict["Type"] = "Income"

                if child.pos_ == 'PRON' and child.text.lower() == 'we':
                    dict["Type"] = "Expense"

        if 'got' in token.text.lower():
            temp = getEndSubString("got", str)
            dict["Amount"] = find_money(temp)
            # str = str.replace(dict["Amount"], "")

            for child in token.children:
                if child.pos_ == 'PRON' and child.text.lower() == 'you':
                    dict["Type"] = "Income"

                if child.pos_ == 'PRON' and child.text.lower() == 'we':
                    dict["Type"] = "Expense"

        if 'credited' in token.text.lower():
            flag = 0
            # print("children")
            for child in token.children:
                # print(child.dep_+" "+child.text)
                if child.pos_ == 'ADP' and (child.text.lower() == 'by' or child.text.lower() == 'with'):
                    flag = 1
                    dict["Type"] = "Credit"
                    temp = getEndSubString("credited", str)
                    dict["Amount"] = find_money(temp)
                    # str = str.replace(dict["Amount"], "")

                if child.pos_ == 'ADP' and child.text.lower() == 'to':
                    flag = 1
                    dict["Type"] = "Credit"
                    temp = getFrontSubString("credited", str)
                    dict["Amount"] = find_money(temp)
                    # str = str.replace(dict["Amount"], "")
            if flag == 0:
                temp = getEndSubString("credited", str)
                dict["Amount"] = find_money(temp)

        if 'cash' in token.text.lower():

            for child in token.children:
                # print(child.dep_+" "+child.text)
                if child.pos_ == 'ADP' and child.text.lower() == 'in':
                    dict["Type"] = "Income"
                    temp = getEndSubString("cash", str)
                    dict["Amount"] = find_money(temp)
                    # str = str.replace(dict["Amount"], "")

                if child.pos_ == 'ADP' and child.text.lower() == 'out':
                    dict["Type"] = "Expense"
                    temp = getFrontSubString("cash", str)
                    dict["Amount"] = find_money(temp)
                    # str = str.replace(dict["Amount"], "")

        if 'debited' in token.text.lower():
            flag = 0
            # print("children")
            for child in token.children:
                # print(child.dep_+" "+child.text)
                if child.pos_ == 'ADP' and (child.text.lower() == 'by' or child.text.lower() == 'with'):
                    flag = 1
                    dict["Type"] = "Debit"
                    temp = getEndSubString("debited", str)
                    dict["Amount"] = find_money(temp)
                    # str = str.replace(dict["Amount"], "")

                if child.pos_ == 'ADP' and child.text.lower() == 'to':
                    flag = 1
                    dict["Type"] = "Debit"
                    temp = getFrontSubString("debited", str)
                    dict["Amount"] = find_money(temp)
                    # str = str.replace(dict["Amount"], "")

            if flag == 0:
                temp = getEndSubString("debited", str)
                dict["Amount"] = find_money(temp)

        if 'transferred' in token.text.lower():

            temp = getFrontSubString("transferred", str)
            dict["Amount"] = find_money(temp)
            # str = str.replace(dict["Amount"], "")
            dict["Type"] = "Expense"

    return dict


sms = []
sms.insert(len(sms), "Cash In Tk 15,300.00 from 01851557738 successful. Fee Tk 0.00. Balance Tk 15,323.64. TrxID 9EB806B056 at 11/05/2022 13:47. Download App: https://bKa.sh/8app")
sms.insert(len(sms), "You have received a deposit of BDT 600")
sms.insert(len(sms), "Bill Payment to DPDC is successful.Amount: BDT 2322.00. Biller Account: 19254909. Fee:0.00 TxnId: 711O3YRZ 11/01/2022 13:36")
sms.insert(len(sms), "Dear Card Member,your monthly bill against card no 452989*2604 is BDT 560.00 dr. for Sep 21. Min due: $500.00. Last Pmt date Oct-4-2021. Call: 16735")
sms.insert(len(sms), "We have received your payment of BDT 500 ")
sms.insert(len(sms), "You have received a deposit of BDT 600")
sms.insert(len(sms), "Payment of BDT 13.20 is made at Infinity Malls ")
sms.insert(len(sms), "Dear Card Member, BDT 636.00 has been credited to your MGBL Credit Card 452989*2604 on 27.07.21. Thank you ")
sms.insert(len(sms), "Dear Sir, your A/C ***7591 debited (Nexus Debit Card Renewal Fee) by Tk460.00 on 08-03-2022 10:54:28 PM C/B Tk19,358.47. NexusPay")
sms.insert(len(sms), "Cash In Tk 15,300.00 from 01851557738 successful. Fee Tk 0.00. Balance Tk 15,323.64. TrxID 9EB806B056 at 11/05/2022 13:47. Download App: https://bKa.sh/8app")
sms.insert(len(sms), "Tk30.00 debited to recharge mobile 01515272739, Your A/C Balance:Tk24.00 TxnId: 2925691685 Date:27-APR-22 07:06:28 pm. Pls download https://bit.ly/nexuspay")
sms.insert(len(sms), "Your Janata Bank account A/C ***7591 has been debited BDT 10,000 at 11/05/2022 13:47. Current balance is BDT 15,000. Thanks")
sms.insert(len(sms), "Congratulations! You have received Cashback Tk 10. Balance Tk 100. TrxID ***123 at 11/05/2022 13:47")
sms.insert(
    len(sms), "Payment Tk 500 to 01456789012 is successful. Balance Tk 10,000.")

sms.insert(
    len(sms), "Payment Tk 500 to 01456789012 is successful. Balance Tk 10,000.")

sms.insert(len(sms), '''Your payment for iPayBRTA Tran-No:2103040849330/BDT 23,293.00 is successful. Please print e-Money Receipt from www.ipaybrta.cnsbd.com
 Thank you.''')

sms.insert(len(sms), "Tk3,000.00 transferred to A/C:017916155391 Fee:Tk.00, Your A/C Balance: Tk1,054.00 TxnId:2890470643 Date:11-APR-22 03:26:20 pm. Download https://bit.ly/nexuspay")
sms.insert(len(sms), "Cash-In from A/C: 019025556564 Tk4,030.00 Fee: Tk.00, Your A/C Balance: Tk4,074.00.TxnId:2868070895 Date:01-APR-22 05:24:25 pm. Download https://bit.ly/nexuspay")
sms.insert(len(sms), "Dear Card Member, BDT 50000.00 has been credited to your MGBL Credit Card 452989*2604 on 23.05.21. Thank you")
# for res in sms:
#     print("\n\n"+res+"\n\n")
#    # res = preProcess(res)
#     dic = getInfo(res)
#     print(type(dic))
#     print(getInfo(res))


# print(getInfo(sms[0]))
