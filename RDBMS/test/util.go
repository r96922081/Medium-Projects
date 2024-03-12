package test

import (
	"io/ioutil"
	"os"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
)

func AssertTrue(t *testing.T, exp bool) {
	assert.True(t, exp)
}

func DeleteFileFolder(folder string) {
	files, _ := ioutil.ReadDir(folder)

	for _, file := range files {
		if file.Name() == "placeholder" {
			continue
		}
		filePath := filepath.Join(folder, file.Name())
		os.Remove(filePath)
	}
}
