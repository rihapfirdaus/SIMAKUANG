const Record = ({ label }) => {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <div className="my-4 flex justify-between items-center">
        <p>label</p>
        <div className="flex justify-center items-center">
          <p>10000</p>
          <IconButton onClick={() => setExpand(!expand)}>
            {expand ? <ExpandMoreOutlined /> : <ExpandLessOutlined />}
          </IconButton>
        </div>
      </div>
      <div>
        <p></p>
      </div>
      <IconButton>
        <EditOutlined />
      </IconButton>
      <IconButton>
        <DeleteOutline />
      </IconButton>
    </>
  );
};

<Form method="post" className=" border-2 p-4 rounded-3xl mx-4">
  <Stack spacing={2}>
    <FormControl>
      <SelectField
        label="Tipe Catatan"
        value={recordType}
        setValue={setRecordType}
        options={optionRecords}
      />
    </FormControl>

    <FormControl>
      {recordType === "debts" ? (
        <Stack direction="row" spacing={2}>
          <DateField
            label={`Tanggal ${record}`}
            value={date}
            setValue={setDate}
          />
          <DateField
            label="Tenggat"
            value={dateline}
            setValue={setDateline}
            isDateline={true}
          />
        </Stack>
      ) : (
        <DateField
          label={`Tanggal ${record}`}
          value={date}
          setValue={setDate}
        />
      )}
    </FormControl>

    <FormControl>
      <CurrencyField
        name="amount"
        label={`Jumlah ${record}`}
        value={amount}
        setValue={setAmount}
      />
    </FormControl>

    <FormControl>
      {recordType === "debts" ? (
        <StringField
          name="lender"
          label="Pemberi Pinjaman"
          value={lender}
          setValue={setLender}
        />
      ) : recordType === "savings" ? (
        <SelectField
          label={`Tipe ${record}`}
          value={savingType}
          setValue={setSavingType}
          options={optionSavings}
        />
      ) : (
        <TextSelectField
          label={`Tipe ${record}`}
          value={category}
          setValue={setCategory}
          options={categories}
        />
      )}
    </FormControl>

    <FormControl>
      <AreaField
        name={notes}
        label="Deskripsi (opsional)"
        value={notes}
        setValue={setNotes}
      />
    </FormControl>

    <Button
      type="submit"
      size="small"
      variant="contained"
      color="success"
      onClick={() => {}}
      sx={{ my: 2, p: 1.5 }}
    >
      Tambah Catatan
    </Button>
  </Stack>
</Form>;
