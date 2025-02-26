import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ISavedGroups } from '../../interfaces/groupsInterface';
import { IStudent } from '../../interfaces/studentInterface';


interface IPDFDocumentProps {
    savedGroups: ISavedGroups;
}

const styles = StyleSheet.create({
    page: {
        padding: 20
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    header: {
        fontSize: 17,
        marginBottom: 20,
        textAlign: 'center',
    },
    headerTwo: {
        fontSize: 15,
        marginBottom: 10,
        marginTop: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
    },
    paragraph: {
        fontSize: 12,
        marginBottom: 5,
    },
    container: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between'
    }
});

const PDFDocument: React.FC<IPDFDocumentProps> = ({ savedGroups }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>{savedGroups.name}</Text>
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.header}>Groep 1</Text>
                    <Text style={styles.headerTwo}>Groep info</Text>
                    <Text style={styles.paragraph}>Grote: {savedGroups.stats.groep1.groepsGrote}</Text>
                    <Text style={styles.paragraph}>Gemiddeld Cognitief Niveau: {Math.round(savedGroups.stats.groep1.gemiddeldCognitief * 10) / 10}</Text>
                    <Text style={styles.paragraph}>Gemiddeld Zorg behoeft: {Math.round(savedGroups.stats.groep1.gemiddeldGedrag * 10) / 10}</Text>
                    <Text style={styles.paragraph}>Jongens: {savedGroups.stats.groep1.jongens}</Text>
                    <Text style={styles.paragraph}>Meisjes: {savedGroups.stats.groep1.meisjes}</Text>
                    <Text style={styles.headerTwo}>Leerlingen </Text>
                    {
                        savedGroups.groupTwo.map((student: IStudent, index: number) => {
                            return (
                                <View key={index} style={styles.paragraph}>
                                    <Text>{student.name}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Groep 2</Text>
                    <Text style={styles.headerTwo}>Groep info </Text>
                    <Text style={styles.paragraph}>Grote: {savedGroups.stats.groep1.groepsGrote}</Text>
                    <Text style={styles.paragraph}>Gemiddeld Cognitief Niveau: {Math.round(savedGroups.stats.groep2.gemiddeldCognitief * 10) / 10}</Text>
                    <Text style={styles.paragraph}>Gemiddeld Zorg behoeft: {Math.round(savedGroups.stats.groep2.gemiddeldGedrag * 10) / 10}</Text>
                    <Text style={styles.paragraph}>Jongens: {savedGroups.stats.groep2.jongens}</Text>
                    <Text style={styles.paragraph}>Meisjes: {savedGroups.stats.groep2.meisjes}</Text>
                    <Text style={styles.headerTwo}>Leerlingen </Text>
                    {
                        savedGroups.groupTwo.map((student: IStudent, index: number) => {
                            return (
                                <View key={index} style={styles.paragraph}>
                                    <Text>{student.name}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </Page>
    </Document>
)

export default PDFDocument;