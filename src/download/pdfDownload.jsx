import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#F0F0F0',
        padding: 10,
        margin: 0,
    },
    section: {
        borderWidth: 2,
        borderColor: '#FF5733',
        borderRadius: 8,
        margin: 5,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        marginBottom: 20,
        backgroundColor: "#e0e0e0",
        width: "40%",
        padding: 10,
        borderRadius: 5,
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: 'center',
        color: '#333',
        textTransform: 'uppercase',
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#666',
        minHeight: 40,
        alignItems: 'center',
    },
    headerRow: {
        backgroundColor: '#e0e0e0',
        fontWeight: 'bold',
    },
    cell: {
        padding: 5,
        fontSize: 10,
        textAlign: 'center',
    },
    nameCell: {
        width: '30%',
        padding: 5,
        textAlign: 'left',
        borderRight: '1px solid #666',
    },
    headerCell: {
        padding: 8,
        paddingLeft: 15,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
    },
    otherCell: {
        width: '17.5%',
        textAlign: 'center',
        borderRight: '1px solid #666',
    },
});


const MyDocument = ({ data, totalMembers }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Invitation Data</Text>
                <View style={styles.grid}>
                    <View style={[styles.row, styles.headerRow, {}]}>
                        <Text style={[styles.headerCell, styles.nameCell]}>Name</Text>
                        <Text style={{ ...styles.headerCell }}>Family Invited</Text>
                        <Text style={styles.headerCell}>Barat Invited</Text>
                        <Text style={styles.headerCell}>Walima Invited</Text>
                        <Text style={{ ...styles.headerCell }}>Total Members</Text>
                    </View>
                    {data.map((item) => (
                        <View key={item.id} style={styles.row}>
                            <Text style={[styles.cell, styles.nameCell]}>{item.member_Name}</Text>
                            <Text style={[styles.cell, styles.otherCell]}>{item.is_Family_Invited ? 'Yes' : 'No'}</Text>
                            <Text style={[styles.cell, styles.otherCell]}>{item.is_Barat_Invited ? 'Yes' : 'No'}</Text>
                            <Text style={[styles.cell, styles.otherCell]}>{item.is_Walima_Invited ? 'Yes' : 'No'}</Text>
                            <Text style={[styles.cell, styles.otherCell]}>{item.total_Members}</Text>
                        </View>
                    ))}

                    <View style={[styles.row, styles.headerRow,]}>
                        <Text style={[styles.headerCell, styles.nameCell]}>Total</Text>
                        <Text style={{ ...styles.headerCell, flexGrow: "1" }}></Text>
                        <Text style={{ ...styles.headerCell }}>{totalMembers}</Text>
                        <Text style={{ ...styles.headerCell }}></Text>
                        <Text style={{ ...styles.headerCell }}></Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export default MyDocument;
