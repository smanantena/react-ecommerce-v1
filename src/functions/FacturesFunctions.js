// import PDFDocument from "pdfkit";
// import BlobStream from "blob-stream";

class FacturesFunctions {

    static generateFactureContentString({ clientName, clientAddress, clientPhone, clientEmail, cart }) {

        const maxLenghtofTextTitle = cart.items.sort(
            (a, b) => (a.title.length < b.title.length)
        )[0].title.length;

        let quantityArray = ['QUANTITY'];
        for (let item of cart.items) {
            quantityArray.push(item.quantity);
        }
        const maxLengthOfQuantityText = quantityArray.sort(
            (a, b) => (a.length < b.length)
        )[0].length;
        
        let priceArray = ['UNIT PRICE'];
        for (let item of cart.items) {
            priceArray.push(String(item.price));
        }
        const maxLengthOfPriceText = priceArray.sort(
            (a, b) => (a.length < b.length)
        )[0].length;

        let amountArray = ['AMOUNT'];
        for (let item of cart.items) {
            amountArray.push((item.amount.toFixed(2)))
        }
        const maxLengthOfAmountText = amountArray.sort(
            (a, b) => (a.length < b.length)
        )[0].length;

        let maxLengthOfRow = maxLenghtofTextTitle + maxLengthOfAmountText + maxLengthOfPriceText + maxLengthOfQuantityText + 4 * 8 + 7 ;


        
        return `
${''.padEnd(maxLengthOfRow, '-')}
    INVOICE
${''.padEnd(maxLengthOfRow, '-')}

    E-SHOP BY RANDRIANTSOA SOLO MANANTENA
    Address: Antananarivo 101
    Phone: +261 32 70 841 97
    Email: randriantsoa.manantena@gmail.com

${''.padEnd(maxLengthOfRow, '-')}
 
    ${'Client'.toUpperCase()}
    Name: ${clientName}${clientAddress ? "\n    Address: " + clientAddress : ''}${clientPhone ? "\n    Phone: " + clientName : ''}${clientEmail ? "\n    Email: " + clientEmail : ''}

${''.padEnd(maxLengthOfRow, '-')}

|   ${'Description'.toUpperCase().padEnd(maxLenghtofTextTitle, ' ')}    |    ${'QUANTITY'.padStart(maxLengthOfQuantityText, ' ')}    |    ${'UNIT PRICE'.padStart(maxLengthOfPriceText + 1)}    |    ${'AMOUNT'.padStart(maxLengthOfAmountText + 1, ' ')}    |
|   ${''.padEnd(maxLenghtofTextTitle, '-')}    |    ${'-'.padStart(maxLengthOfQuantityText, '-')}    |    ${'-'.padStart(maxLengthOfPriceText + 1, '-')}    |    ${'-'.padStart(maxLengthOfAmountText + 1, '-')}    |
${cart.items.map(
            (item) => {
                
                    return `|   ${item.title.padEnd(maxLenghtofTextTitle, ' ')}    |    ${String(item.quantity).padStart(maxLengthOfQuantityText, ' ')}    |   $${(String(item.price.toFixed(2))).padStart(maxLengthOfPriceText + 1, ' ')}    |   $${(String(item.amount.toFixed(2))).padStart(maxLengthOfAmountText + 1, ' ')}    |`;
                
            }
        ).join('\n')
            }

${''.padEnd(maxLengthOfRow, '-')}

    TOTAL: $${cart.total} USD

${''.padEnd(maxLengthOfRow, '-')}
`;
    }

    // static generateFactureContentPDF() {
    //     const pdfDocForFacture = new PDFDocument({ size: 'A4' });
    //     const dateOfCreation = new Date();

    //     const nameOfPDFDoc = `ecommerce-by-manantena-${dateOfCreation.getFullYear}-${dateOfCreation.getMonth}-${dateOfCreation.getDate()}-${dateOfCreation.getHours()}-${dateOfCreation.getMinutes()}-${dateOfCreation.getSeconds()}.pdf`;

    //     const stream = pdfDocForFacture.pipe(BlobStream());

    //     pdfDocForFacture.fontSize(25)
    //         .text('INVOICE', { align: 'center' });

    //     pdfDocForFacture.end();
    //     stream.on('finish', function () {
    //         // get a blob you can do whatever you like with
    //         // const blob = stream.toBlob('application/pdf');
    //         let blob = new Blob(['Manantena'], {type: 'application/pdf'});

    //         // or get a blob URL for display in the browser
    //         const url = stream.toBlobURL('application/pdf');
    //         // iframe.src = url;
    //         const linkDynamic = document.createElement('a');
    //         linkDynamic.download = 'facture.pdf';
    //         linkDynamic.href = URL.createObjectURL(blob);
    //         linkDynamic.target = '_blank';

    //         linkDynamic.click();

    //         URL.revokeObjectURL(linkDynamic.href)
    //     });


    // }
}

export default FacturesFunctions